const team1Input = document.getElementById('team1Logo')
const team2Input = document.getElementById('team2Logo')
const teams = nodecg.Replicant('teams');

NodeCG.waitForReplicants(teams).then(() => {

	$(function() {

		var $team1Logo = $("#team1Logo");
		var $team2Logo = $("#team2Logo");

		teams.value.forEach(row => {

			$team1Logo.append($("<option />").val(row.image).text(row.name))
			$team2Logo.append($("<option />").val(row.image).text(row.name))

		})
	})

})


function update() {

	const data = {
		team1Logo: team1Input.value,
		team2Logo: team2Input.value,
	}
	nodecg.sendMessage('updateLogos', data);
}
