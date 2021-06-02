const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');

function brbCountdown() {
	data = {
		minutes: minutes.value,
		seconds: seconds.value,
		timeName: '#topTime',
	};

	nodecg.sendMessage('timechange', data);
}

function preCountdown() {
	data = { minutes: minutes.value, seconds: seconds.value };

	nodecg.sendMessage('preTimer', data);
}
