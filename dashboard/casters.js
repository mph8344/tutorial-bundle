const leftCaster = document.getElementById('leftCaster')
const rightCaster = document.getElementById('rightCaster')


function update() {
	const data = {leftCaster: leftCaster.value, rightCaster: rightCaster.value, game: "valorant"}
	nodecg.sendMessage('updateCasters', data)
}

function csgoUpdate() {
	const data = {leftCaster: leftCaster.value, rightCaster: rightCaster.value, game: "cs"}
	nodecg.sendMessage('updateCasters', data)
}