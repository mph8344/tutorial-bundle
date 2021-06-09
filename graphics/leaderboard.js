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

nodecg.listenFor('.leaderUpdate', (data) => {
	//$(`#${data.position}`).text(data.name);
});

nodecg.listenFor('leaderboard', (show = data.show) => {
	var right = show ? '0px' : '-500px';
	$('.bg').css('right', right);
});
