//'use strict';

const { Connection, Request } = require("tedious");
const request = require('request');
const keyconfig = require('../key-config.json');
const { response } = require("../../../lib/login");

const csOptions = {
  url: 'https://open.faceit.com/data/v4/championships/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=upcoming&offset=0&limit=10',
  headers: {
    Authorization: `Bearer ${keyconfig.Authorization}`
  }
}

const csPast = {
  url: 'https://open.faceit.com/data/v4/championships/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=past&offset=0&limit=5',
  headers: {
    Authorization: `Bearer ${keyconfig.Authorization}`
  }
}

const valOptions = {
  url: 'https://open.faceit.com/data/v4/championships/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=upcoming&offset=0&limit=10',
  headers: {
    Authorization: `Bearer ${keyconfig.Authorization}`
  }
}

const valPast = {
  url: 'https://open.faceit.com/data/v4/championships/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=past&offset=0&limit=5',
  headers: {
    Authorization: `Bearer ${keyconfig.Authorization}`
  }
}

  

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


function getTeamName(id) {

  var teamOptions = {
    url: `https://open.faceit.com/data/v4/teams/${id}`,
    headers: {
      Authorization: `Bearer ${keyconfig.Authorization}`
    }
  }

  var promise = new Promise((resolve, reject) => {
    request.get(teamOptions, (error, response, body) => {
      var o = JSON.parse(body);
      resolve(o.name);
    })
  })

  return promise;

}

function addPastData(data, scores) {

  var count = 0;
  var matches = []
  data.forEach(element => {


    var team1Match = element.results.score.faction1;
    var team2Match = element.results.score.faction2;

    var matchID = element.match_id;


    var team1Name = element.teams.faction1.name;
    var team2Name = element.teams.faction2.name;

    var options = {
      url: `https://open.faceit.com/data/v4/matches/${matchID}/stats`,
      headers: {
        Authorization: `Bearer ${keyconfig.Authorization}`
      }
    }

    var winnerIsOne = element.results.winner == 'faction1';


    request.get(options, (err, response, body) => {
      var o = JSON.parse(body);
      if (o.rounds != undefined && o.rounds.length > 2) {
        scores.push('(2-1)')
        ///console.log(o.rounds.length);
      } else if (o.rounds != undefined) {
        scores.push('(2-0)');
      } else {
        scores.push('(FFW)');
      }
    })

    var str;
    if (winnerIsOne) {
      str = `${team1Name} vs ${team2Name}`;
    } else {
      str = `${team2Name} vs ${team1Name}`;
    }
    
     
    matches.push(str);


  })
  //console.log('out of loop');

  return matches;
}


  

module.exports = function (nodecg) {
    nodecg.Replicant('team1score', {defaultValue: 0});
    nodecg.Replicant('team2score', {defaultValue: 0});
    nodecg.Replicant('team1Name', {defaultValue: "Test"});
    nodecg.Replicant('team2Name', {defaultValue: "Test"});
    let teams = nodecg.Replicant('teams', {defaultValue: []})
    let pastMatches = nodecg.Replicant('pastMatches', {defaultValue: []})
    let pastScores = nodecg.Replicant('pastScores', {defaultValue: []})

    let docs = [];
    let csMatches = [];
    let valMatches = [];
    let csPastMaches = [];
    let valPastMatches = [];
    let csScores = [];
    let valScores = [];

    connection.on("connect", err => {
      if (err) {
        console.error(err.message);
      } else {
          queryDatabase().then(response => {
            teams.value = response;
            docs = response;
          })
      }
    
    });


    request.get(csOptions, (error, response, body) => {
      var o = JSON.parse(body);
      tryData(o.items, csMatches)
    })

    request.get(csPast, (error, response, body) => {
      var o = JSON.parse(body);
      csPastMatches = addPastData(o.items, csScores);
    })

    request.get(valOptions, (error, response, body) => {
      var o = JSON.parse(body);
      tryData(o.items, valMatches)
    })

    request.get(valPast, (error, response, body) => {
      var o = JSON.parse(body);
      valPastMatches = addPastData(o.items, valScores)
    })
  

    connection.connect();

    nodecg.listenFor("getTeams", () => {
      nodecg.sendMessage('sendTeams', docs)
    })

    nodecg.listenFor('updateBG', (data) => {
      if (data.game == 'cs') {
        nodecg.sendMessage('changeMatches', {matches: csMatches, past: csPastMatches, scores: csScores})
      } else {
        nodecg.sendMessage('changeMatches', {matches: valMatches, past: valPastMatches, scores: valScores})
      }
    })

}
