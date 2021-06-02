var myTimer;

nodecg.listenFor('timechange', (data) => {
	var $timer = $('.counter');

	var dt = new Date();
	dt.setHours(0);
	dt.setMinutes(data.minutes);
	dt.setSeconds(data.seconds);

	var temp = dt.toTimeString().split(' ');
	var ts = temp[0].split(':');

	$timer.html(ts[1] + ':' + ts[2]);
	clearInterval(myTimer);
	myTimer = setInterval(update, 1000);
});

function update() {
	var $timer = $('.counter');

	var myTime = $timer.html();
	var ss = myTime.split(':');

	var dt = new Date();
	dt.setHours(0);
	dt.setMinutes(ss[0]);
	dt.setSeconds(ss[1]);

	if (ss[0] == '00' && ss[1] == '00') {
		clearInterval(myTimer);
		return;
	}

	var dt2 = new Date(dt.valueOf() - 1000);
	var temp = dt2.toTimeString().split(' ');
	var ts = temp[0].split(':');

	$timer.html(ts[1] + ':' + ts[2]);
}

nodecg.listenFor('flavorChange', (data) => {
	var text = data.text.toUpperCase();
	var $flavor = $('#flavor');
	$flavor.text(text);
});

// function updateTime(timeName, data) {
// 	var seconds = data.seconds < 10 ? `0${data.seconds}` : `${data.seconds}`;
// 	var minutes = data.minutes;

// 	$('#topTime').text(`${minutes}:${seconds}`);

// }

nodecg.listenFor('crossOut', (data) => {
	console.log(data.lineName);

	var decoration = data.value ? 'line-through' : '';
	var color = data.value ? '#b3b4b5' : 'white';

	$(data.lineName).css('text-decoration', decoration);
	$(data.lineName).css('color', color);
});
