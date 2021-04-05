const team1Input = document.getElementById('team1Name')
const team2Input = document.getElementById('team2Name')

function update() {

	const data = {
		team1Name: team1Input.value,
		team2Name: team2Input.value,
	}
	nodecg.sendMessage('CreateTeams', data);
}


function updateT1Players() {

	const team1Data = {
		p1: $("#team1P1").val(),
		p2: $("#team1P2").val(),
		p3: $("#team1P3").val(),
		p4: $("#team1P4").val(),
		p5: $("#team1P5").val(),
	}

	nodecg.sendMessage("team1Names", team1Data);
	
}

function updateT2Players() {

	const team2Data = {
		p1: $("#team2P1").val(),
		p2: $("#team2P2").val(),
		p3: $("#team2P3").val(),
		p4: $("#team2P4").val(),
		p5: $("#team2P5").val(),
	}

	nodecg.sendMessage("team2Names", team2Data);


}