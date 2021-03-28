
const team1 = document.getElementById('leftText');
const team2 = document.getElementById('rightText');

const team1Side = document.getElementById('leftSide');
const team2Side = document.getElementById('rightSide');


const team1Score = document.getElementById('leftScore')
const team2Score = document.getElementById('rightScore')

const team1Rep = nodecg.Replicant('team1score');
const team2Rep = nodecg.Replicant('team2score');

const team1SideRep = nodecg.Replicant('team1Side');
const team2SideRep = nodecg.Replicant('team2Side');




nodecg.listenFor('CreateTeams', (newVal) => {
	team1.innerHTML = newVal.team1Name;
	team2.innerHTML = newVal.team2Name;

})

nodecg.listenFor('bo3Toggle', (data) => {
	if (data.value) {
		document.body.style.backgroundImage ='url("./images/bo3Layout.png")'
	} else {
		document.body.style.backgroundImage ='url("./images/ValorantLayout.png")'
	}
})

