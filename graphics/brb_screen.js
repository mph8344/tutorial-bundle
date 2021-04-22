
var myTimer;

var matches = [];

const valPast = nodecg.Replicant('valPast');
const csPast = nodecg.Replicant('csPast');
const csCurrent = nodecg.Replicant('csCurrent');
const valCurrent = nodecg.Replicant('valCurrent');

nodecg.listenFor('csMatches', () => {
	console.log('here');
	matches = csCurrent.value;

	var text = csPast.value[0];

	for (let i = 1; i < csPast.value.length; i++) {
		text += ("  |  " + csPast.value[i])
	}
	$('.scroller').html(text);
})

nodecg.listenFor('valMatches', () => {
	console.log('here');
	matches = valCurrent.value;

	var text = valPast.value[0];

	for (let i = 1; i < valPast.value.length; i++) {
		text += ("  |  " + valPast.value[i])
	}
	$('.scroller').html(text);
})

$(function() {
	displayClass(0);
})

nodecg.listenFor('timechange', (data) => {
	var $timer = $(".counter")

	var dt = new Date();
	dt.setHours(0);
	dt.setMinutes(data.minutes);
	dt.setSeconds(data.seconds);
    
	var temp = dt.toTimeString().split(" ");
	console.log(temp);
	var ts = temp[0].split(":");

	$timer.html(ts[1] + ":" + ts[2]);
	clearInterval(myTimer)
	myTimer = setInterval(update, 1000)
	
})

function update() {
	var $timer = $(".counter")
	
	var myTime = $timer.html();
	var ss = myTime.split(":");

	var dt = new Date();
	dt.setHours(0);
	dt.setMinutes(ss[0]);
	dt.setSeconds(ss[1]);

	if (ss[0] == '00' && ss[1] == '00') {
		clearInterval(myTimer);
		return;
	}

	var dt2 = new Date(dt.valueOf() - 1000);
	var temp = dt2.toTimeString().split(" ");
	var ts = temp[0].split(":");

	$timer.html(ts[1]+":"+ts[2]);
}


nodecg.listenFor('flavorChange', (data) => {

	var text = data.text.toUpperCase();
	var $flavor = $("#flavor");
	$flavor.text(text);


})




// function tryData(data) {

// 	matches = [];

// 	data.forEach(element => {
// 		var teamOneName = element.teams.faction1.avatar
// 		var teamTwoName = element.teams.faction2.avatar
		
// 		matches.push(`<img src="${teamOneName}"/> <p>VS</p> <img src="${teamTwoName}"/>`)
	

// 	})

// 	displayClass(0);
// }

function displayClass(i) {
	if (isNaN(i)) {
		i = 0;
	}

    $('.upcoming_matches').html(matches[i]).fadeIn(1000, function() {

        $(this).delay(2000).fadeOut(1000, function() {
            displayClass((i + 1) % matches.length);
        });
    });
}