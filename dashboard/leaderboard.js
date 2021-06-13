$(generateTable());

function generateTable() {
	var i;
	for (i = 0; i < 10; i++) {
		//$('#main').append(`<div class="row"> ${i} </div>`);

		var textBox = document.createElement('input');
		var intBox = document.createElement('input');
		$(textBox).prop({
			type: 'text',
			place: i + 1,
			id: `text${i + 1}`,
			placeholder: `Player ${i + 1}`,
		});

		$(intBox).prop({
			type: 'number',
			id: `${i + 1}`,
			prevplace: `${i + 1}`,
			min: '1',
			max: '10',
			value: `${i + 1}`,
		});

		intBox.onchange = updateNumber;
		textBox.onchange = updateText;

		$('#main').append(textBox, intBox, `<br/>`);
	}
}

// function updateNumber() {
// 	console.log(this.value);
// }

function updateText() {
	var data = {
		num1: this.place,
		val1: this.value,
		num2: this.place,
		val2: this.value,
	};

	nodecg.sendMessage('updateLeaderboard', data);
}

function updateNumber() {
	var oldValue = this.prevplace; // 1
	var newValue = this.value; // 2

	var newBox = document.getElementById(newValue);

	if (newBox) {
		//console.log(prevText);

		var originalText = document.getElementById(`text${oldValue}`);
		var newBoxText = document.getElementById(`text${newValue}`);

		console.log(
			`Text: ${originalText.value}, From: ${originalText.place}, To: ${newValue}`
		);
		console.log(
			`MText: ${newBoxText.value}, From: ${newBoxText.place} To: ${oldValue}`
		);

		originalText.place = newValue;
		newBoxText.place = oldValue;
		originalText.id = `text${newValue}`;
		newBoxText.id = `text${oldValue}`;

		// console.log(prevText.value);
		// console.log(curText.value);
		var data = {
			val1: originalText.value,
			num1: originalText.place,
			val2: newBoxText.value,
			num2: newBoxText.place,
		};

		nodecg.sendMessage('updateLeaderboard', data);

		newBox.value = newBox.prevplace = newBox.id = oldValue; // 1

		this.prevplace = this.id = newValue; // 2
	}

	// console.log(box);
}
