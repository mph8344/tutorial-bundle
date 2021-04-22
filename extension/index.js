'use strict';

const nodecgApiContext = require('./nodecg-api-context');

module.exports = function (nodecg) {

    nodecgApiContext.set(nodecg);

    nodecg.Replicant('team1score', {defaultValue: 0});
    nodecg.Replicant('team2score', {defaultValue: 0});
    nodecg.Replicant('team1Name', {defaultValue: "Test"});
    nodecg.Replicant('team2Name', {defaultValue: "Test"});
    nodecg.Replicant('teams', {persistent: false, defaultValue: []})
    nodecg.Replicant('valPast', {persistent: false, defaultValue: []})
    nodecg.Replicant('csPast', {persistent: false, defaultValue: []})
    nodecg.Replicant('csCurrent', {persistent: false, defaultValue: []})
    nodecg.Replicant('valCurrent', {persistent: false, defaultValue: []})


    require('./requests')

}
