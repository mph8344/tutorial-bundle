$(generateTable());

function generateTable() {
	var i;
	for (i = 0; i < 10; i++) {
		//$('#main').append(`<div class="row"> ${i} </div>`);

		var textBox = document.createElement('input');
		var intBox = document.createElement('input');
		$(textBox).prop({
			type: 'text',
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

		$('#main').append(textBox, intBox, `<br/>`);
	}
}

// function updateNumber() {
// 	console.log(this.value);
// }

function updateNumber() {
	var prevValue = this.prevplace; // 1
	var curValue = this.value; // 2

	var prevBox = document.getElementById(curValue);

	if (prevBox) {
		//console.log(prevText);

		prevBox.value = prevBox.prevplace = prevBox.id = prevValue; // 1

		this.prevplace = this.id = curValue; // 2
	}

	// console.log(box);
}
