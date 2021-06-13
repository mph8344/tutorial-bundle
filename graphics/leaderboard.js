var rightCount = 450;
var leftCount = 450;

$(
	$('.right').each(function () {
		$(this).css('top', (rightCount += 62));
	})
);

$(
	$('.left').each(function () {
		$(this).css('top', (leftCount += 62));
	})
);

nodecg.listenFor('updateLeaderboard', (data) => {
	console.log(`${data.num1}, ${data.val1}`);
	console.log(`${data.num2}, ${data.val2}`);

	$(`#${data.num1}`).text(data.val1);
	$(`#${data.num2}`).text(data.val2);
});

nodecg.listenFor('leaderboard', (show = data.show) => {
	var right = show ? '0px' : '-500px';
	$('.bg').css('right', right);
});
