
const vidEl = document.getElementById('videoid')
const videoWrapper = document.getElementById('casters')

nodecg.listenFor('updateBG', (data) => {

	if (data.game === "cs") {
		vidEl.src =  "./images/CSSaturate.webm";
	} else {
		vidEl.src = "./images/ValorantSaturate.webm";
		
	}

	videoWrapper.load();
	videoWrapper.play();

})