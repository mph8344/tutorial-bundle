const LCasterRep = nodecg.Replicant('leftCaster');
const RCasterRep = nodecg.Replicant('rightCaster');

const LCaster = document.getElementById('leftCaster');
const RCaster = document.getElementById('rightCaster');

nodecg.listenFor('updateCasters', (data) => {

	var upperLeft = data.leftCaster.toUpperCase();
	var upperRight = data.rightCaster.toUpperCase();

	LCaster.innerHTML = upperLeft
	RCaster.innerHTML = upperRight
})