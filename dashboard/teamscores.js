
const score1Input = document.getElementById('scoreTeam1')
const score2Input = document.getElementById('scoreTeam2')


function update() {
	const data = {
		score1: score1Input.value, 
		score2: score2Input.value,
	}
	nodecg.sendMessage('ScoreTeams', data);
}
