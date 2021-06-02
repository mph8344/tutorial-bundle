const flavorText = document.getElementById('flavorText');

const topBox = document.getElementById('checkboxTop');
const midBox = document.getElementById('checkboxMid');
const botBox = document.getElementById('checkboxBot');

topBox.addEventListener('change', function () {
	data = { value: topBox.checked, lineName: '#top' };
	nodecg.sendMessage('crossOut', data);
});

midBox.addEventListener('change', function () {
	data = { value: midBox.checked, lineName: '#mid' };
	nodecg.sendMessage('crossOut', data);
});

botBox.addEventListener('change', function () {
	data = { value: botBox.checked, lineName: '#bot' };
	nodecg.sendMessage('crossOut', data);
});

// function update() {
// 	const data = { text: flavorText.value };
// 	nodecg.sendMessage('flavorChange', data);
// }
