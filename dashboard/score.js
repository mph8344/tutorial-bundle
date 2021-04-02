
const team1Rep = nodecg.Replicant('team1score', {defaultValue: 0});
const team2Rep = nodecg.Replicant('team2score', {defaultValue: 0});

const bo3Box = document.getElementById("checkbox");


function addTeam1() {
	team1Rep.value++;
}

function subTeam1() {
	if (team1Rep.value > 0) {
		team1Rep.value--;
	}
}

function addTeam2() {
	team2Rep.value++;
}

function subTeam2() {
	if (team2Rep.value > 0) {
		team2Rep.value--;
	}
}

function resetScore() {
	team1Rep.value = 0;
	team2Rep.value = 0;
}

bo3Box.addEventListener('change', function() {
	data = { value: bo3Box.checked }
	nodecg.sendMessage('bo3Toggle', data)
})