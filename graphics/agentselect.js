const team1Rep = nodecg.Replicant('team1Name');
const team2Rep = nodecg.Replicant('team2Name');

team1Rep.on('change', (value) => {
	console.log('test');
	$('#left').text(value.toUpperCase());
});

team2Rep.on('change', (value) => {
	console.log();
	$('#right').text(value.toUpperCase());
});

nodecg.listenFor('CreateTeams', (newVal) => {
	console.log('test');
	$('#left').text(newVal.team1Name.toUpperCase());
	$('#right').text(newVal.team2Name.toUpperCase());
});
