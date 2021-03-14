const LCasterRep = nodecg.Replicant('leftCaster');
const RCasterRep = nodecg.Replicant('rightCaster');

const LCaster = document.getElementById('leftCaster');
const RCaster = document.getElementById('rightCaster');
const vidEl = document.getElementById('test')
const test = document.getElementById('casters')

nodecg.listenFor('updateCasters', (data) => {

	var upperLeft = data.leftCaster.toUpperCase();
	var upperRight = data.rightCaster.toUpperCase();

	console.log(data.game);
	if (data.game === "cs") {
		vidEl.src =  "./images/CSCasters.webm";
	} else {
		vidEl.src = "./images/ValCasters.webm";
		
	}
	
	console.log(test.innerHTML)
	test.load();
	test.play();



	LCaster.innerHTML = upperLeft
	RCaster.innerHTML = upperRight
})