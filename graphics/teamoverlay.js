const team1 = document.getElementById('leftTeam');
const team2 = document.getElementById('rightTeam');

const team1Score = document.getElementById('leftScore');
const team2Score = document.getElementById('rightScore');

const team1Rep = nodecg.Replicant('team1score');
const team2Rep = nodecg.Replicant('team2score');

const name1Rep = nodecg.Replicant('team1Name');
const name2Rep = nodecg.Replicant('team2Name');

name1Rep.on('change', (value) => {
	$('#leftTeam').text(value.toUpperCase());
});

name2Rep.on('change', (value) => {
	$('#rightTeam').text(value.toUpperCase());
});

team1Rep.on('change', (value) => {
	team1Score.innerHTML = value;
});

team2Rep.on('change', (value) => {
	team2Score.innerHTML = value;
});

nodecg.listenFor('CreateTeams', (newVal) => {
	team1.innerHTML = newVal.team1Name.toUpperCase();
	team2.innerHTML = newVal.team2Name.toUpperCase();
});

nodecg.listenFor('bo3Toggle', (data) => {
	if (data.value) {
		team1Score.style.display = 'block';
		team2Score.style.display = 'block';
		document.body.style.backgroundImage = 'url("./images/bo3Layout.png")';
	} else {
		team1Score.style.display = 'none';
		team2Score.style.display = 'none';
		document.body.style.backgroundImage =
			'url("./images/ValorantLayout.png")';
	}
});
