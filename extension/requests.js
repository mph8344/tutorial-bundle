'use strict';

const { Connection, Request } = require("tedious");
const axios = require('axios');
const nodecg = require('./nodecg-api-context').get();
const request = require('request');
const keyconfig = require('../key-config.json');

/**
 * Base Parameters for the axios calls
 */
const params = {
  method: 'get',
  baseURL: 'https://open.faceit.com/data/v4/championships',
  headers: {
    Authorization: `Bearer ${keyconfig.Authorization}`
  }
}

/**
 * The tedious connection to the database
 */
const connection = new Connection(keyconfig.db);

function queryDatabase() {

  var docs = [];

  // Read all rows from table
  const request = new Request(
    `SELECT name, ('https://naccsstorage.blob.core.windows.net/team-pictures/' + profilePicture) as pictureUrl FROM team WHERE profilePicture != '' ORDER BY name`,
    (err, rowCount, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        
      }
    }
  );
  

    var promise = new Promise((resolve, reject) => {
        connection.execSql(request.on('doneInProc', function(rowCount, more, rows){

            rows.forEach(row => {
                docs.push({name: row[0].value, image: row[1].value});
            })
            resolve(docs);
        }));
    })

    return promise;
}

function tryData(data, matches) {

  data.forEach(element => {
    var teamOneName = element.teams.faction1.avatar
    var teamTwoName = element.teams.faction2.avatar
    
    matches.push(`<img src="${teamOneName}"/> <p>VS</p> <img src="${teamTwoName}"/>`)
  })
}


function addPastData(data, matches) {


  var options = {
    method: 'get',
    baseURL: 'https://open.faceit.com/data/v4/matches/',
    headers: {
      Authorization: `Bearer ${keyconfig.Authorization}`
    }
  }

  var matchInstance = axios.create(options);

  data.forEach(element => {

    var team1Name = element.teams.faction1.name;
    var team2Name = element.teams.faction2.name;

    var matchString = `${element.match_id}/stats`
    
    var score = '(FFW)';
    var str = (element.results.winner == 'faction1') ? `${team1Name} vs ${team2Name}` : `${team2Name} vs ${team1Name}`;
    var match = str;
    matchInstance.get(matchString).then(response => {
    
      var rounds = response.data.rounds;
      if (rounds.length > 2) {
        score = '(2-1)';
      } else if (rounds.length) {
        score = '(2-0)';
      } else {
        score = '(FFW)';
      }


      match = match + " - " + score;
      matches.push(match);


    }).catch(error => {
      
      score = '(FFW)';

      match = match + " - " + score;
      matches.push(match);
    })

  })

}


const instance = axios.create(params);

const valPast = nodecg.Replicant('valPast');
const csPast = nodecg.Replicant('csPast');
const csCurrent = nodecg.Replicant('csCurrent');
const valCurrent = nodecg.Replicant('valCurrent');

function refreshLists() {

  csCurrent.value = [];
  valCurrent.value = [];
  csPast.value = [];
  valPast.value = [];

  instance.get('/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=upcoming&offset=0&limit=10').then(response => {
    tryData(response.data.items, csCurrent.value)
  })

  instance.get('/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=upcoming&offset=0&limit=10').then(response => {
    tryData(response.data.items, valCurrent.value)
  })

  instance.get('/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=past&offset=0&limit=5').then(response => {
    addPastData(response.data.items, csPast.value);

  })

  instance.get('/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=past&offset=0&limit=5').then(response => {
    addPastData(response.data.items, valPast.value);

  })

}

const teams = nodecg.Replicant('teams');

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
      queryDatabase().then(response => {
        teams.value = response;
      })
  }

});
    
    
  refreshLists();

  connection.connect();

  nodecg.listenFor('refresh', () => {
    queryDatabase().then(response => {
      teams.value = response;
    })

    refreshLists();
  })



  nodecg.listenFor('updateBG', (data) => {
    if (data.game == 'cs') {
      nodecg.sendMessage('csMatches')
      //console.log(csPast.value);
    } else {
      //console.log(valPast.value);
      nodecg.sendMessage('valMatches')
    }
  })

