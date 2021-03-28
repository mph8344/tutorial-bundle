const team1Input = document.getElementById('team1Name')
const team2Input = document.getElementById('team2Name')

const fileSelect1 = document.getElementById('team1Logo');
const fileSelect2 = document.getElementById('team2Logo');


function update() {

	

	const data = {
		team1Name: team1Input.value,
		team2Name: team2Input.value,
		team1Logo: fileSelect1.value,
		team2Logo: fileSelect2.value
	}
	nodecg.sendMessage('CreateTeams', data);
}



function reset() {

	NodeCG.waitForReplicants(team1Rep, team2Rep).then(() => {

		team1Rep.value = 'DEF'
		team2Rep.value = 'ATK'

	});
}