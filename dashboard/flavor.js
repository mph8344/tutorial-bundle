const flavorText = document.getElementById('flavorText')


function update() {

	const data = {text: flavorText.value}
	nodecg.sendMessage('flavorChange', data)
}
