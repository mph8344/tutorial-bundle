
const team1 = document.getElementById('leftText');
const team2 = document.getElementById('rightText');

const team1El = document.getElementById('leftOut');
const team2El = document.getElementById('rightOut');


nodecg.listenFor('EditTeam', (newVal) => {
	team1.innerHTML = newVal.team1Name;
	team2.innerHTML = newVal.team2Name;
	team1El.style.display = 'flex'
	team2El.style.display = 'flex'

	
	team1El.style.backgroundColor=newVal.team1Color;

	team2El.style.backgroundColor=newVal.team2Color;

	team2El.style.color=newVal.team2Font;

	team1El.style.color=newVal.team1Font;


})

nodecg.listenFor('bo3Toggle', (data) => {
	console.log(data.value);
})