const leftCaster = document.getElementById('leftCaster')
const rightCaster = document.getElementById('rightCaster')


function update() {
	const data = {leftCaster: leftCaster.value, rightCaster: rightCaster.value}
	nodecg.sendMessage('updateCasters', data)
}