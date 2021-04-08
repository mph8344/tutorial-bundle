$(function() {

	$.ajax({
		type: 'GET',
		url: 'https://open.faceit.com/data/v4/championships/403d4b88-9c57-46e6-826d-b2d702f97098/matches?type=upcoming&offset=0&limit=10',

		headers: {Authorization: "Bearer c5bb31ef-5e33-4bae-a854-49fd35f032f2"} ,
		success: function(data) {
			tryData(data.items);
		}
	})

})

var myTimer;

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

nodecg.listenFor('flavorChange', (data) => {

	var text = data.text.toUpperCase();
	var $flavor = $("#flavor");
	$flavor.text(text);


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


function tryData(data) {

	data.forEach(element => {
		var teamOneName = element.teams.faction1.avatar
		var teamTwoName = element.teams.faction2.avatar
		
		matches.push(`<img src="${teamOneName}"/> <p>VS</p> <img src="${teamTwoName}"/>`)
	

	})

}

var matches = [];

(function displayClass(i) {

    $('.upcoming_matches').html(matches[i]).fadeIn(1000, function() {
        $(this).delay(2000).fadeOut(1000, function() {
            displayClass((i + 1) % matches.length);
        });
    });
})(0);