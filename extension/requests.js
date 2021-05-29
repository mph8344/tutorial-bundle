'use strict';

const { Connection, Request } = require('tedious');
const axios = require('axios');
const nodecg = require('./nodecg-api-context').get();
const request = require('request');
const keyconfig = require('../key-config.json');
const { isNull } = require('gulp-util');

/**
 * Base Parameters for the axios calls
 */
const params = {
	method: 'get',
	baseURL: 'https://open.faceit.com/data/v4/championships',
	headers: {
		Authorization: `Bearer ${keyconfig.Authorization}`,
	},
};

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
		connection.execSql(
			request.on('doneInProc', function (rowCount, more, rows) {
				rows.forEach((row) => {
					docs.push({ name: row[0].value, image: row[1].value });
				});
				resolve(docs);
			})
		);
	});

	return promise;
}

function tryData(data, matches) {
	data.forEach((element) => {
		var teamOneName = element.teams.faction1.avatar;
		var teamTwoName = element.teams.faction2.avatar;

		matches.push(
			`<img src="${teamOneName}"/> <p>VS</p> <img src="${teamTwoName}"/>`
		);
	});
}

function addPastData(data, scores) {
	var count = 0;
	var matches = [];
	data.forEach((element) => {
		var matchID = element.match_id;
		var team1Name = element.teams.faction1.name;
		var team2Name = element.teams.faction2.name;

		var options = {
			url: `https://open.faceit.com/data/v4/matches/${matchID}/stats`,
			headers: {
				Authorization: `Bearer ${keyconfig.Authorization}`,
			},
		};

		if (element != undefined && element.results != undefined) {
			//console.log(element.results);
			var winnerIsOne = element.results.winner == 'faction1';

			request.get(options, (err, response, body) => {
				var o = JSON.parse(body);
				if (o.rounds != undefined && o.rounds.length > 2) {
					scores.push('(2-1)');
					///console.log(o.rounds.length);
				} else if (o.rounds != undefined) {
					scores.push('(2-0)');
				} else {
					scores.push('(FFW)');
				}
			});

			var str;
			if (winnerIsOne) {
				str = `${team1Name} vs ${team2Name}`;
			} else {
				str = `${team2Name} vs ${team1Name}`;
			}

			matches.push(str);
		}
	});

	return matches;
}

const instance = axios.create(params);

var csMatches = [];
var valMatches = [];
var csScores = [];
var valScores = [];
var csPastMatches = [];
var valPastMatches = [];

function refreshLists() {
	instance
		.get(
			'/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=upcoming&offset=0&limit=10'
		)
		.then((response) => {
			csMatches = [];
			tryData(response.data.items, csMatches);
		});

	instance
		.get(
			'/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=upcoming&offset=0&limit=10'
		)
		.then((response) => {
			valMatches = [];
			tryData(response.data.items, valMatches);
		});

	instance
		.get(
			'/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=past&offset=0&limit=5'
		)
		.then((response) => {
			csScores = [];
			csPastMatches = addPastData(response.data.items, csScores);
		});

	instance
		.get(
			'/3bc6ab55-aae7-45a3-8695-dc64590d0616/matches?type=past&offset=0&limit=5'
		)
		.then((response) => {
			valScores = [];
			valPastMatches = addPastData(response.data.items, valScores);
		});
}

const teams = nodecg.Replicant('teams');

connection.on('connect', (err) => {
	if (err) {
		console.error(err.message);
	} else {
		queryDatabase().then((response) => {
			teams.value = response;
		});
	}
});

refreshLists();

connection.connect();

nodecg.listenFor('refresh', () => {
	queryDatabase().then((response) => {
		teams.value = response;
	});

	refreshLists();
});

nodecg.listenFor('updateBG', (data) => {
	if (data.game == 'cs') {
		nodecg.sendMessage('changeMatches', {
			matches: csMatches,
			past: csPastMatches,
			scores: csScores,
		});
	} else {
		nodecg.sendMessage('changeMatches', {
			matches: valMatches,
			past: valPastMatches,
			scores: valScores,
		});
	}
});
