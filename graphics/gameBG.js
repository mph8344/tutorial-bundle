
const vidEl = document.getElementById('videoid')
const videoWrapper = document.getElementById('casters')

nodecg.listenFor('updateBG', (data) => {

	if (data.game === "cs") {
		vidEl.src =  "./images/CSGOMotion.webm";
	} else {
		vidEl.src = "./images/ValorantMotion.webm";
		
	}

	videoWrapper.load();
	videoWrapper.play();

})