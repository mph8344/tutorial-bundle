$(generateTable());

function generateTable() {
	var i;
	for (i = 0; i < 10; i++) {
		//$('#main').append(`<div class="row"> ${i} </div>`);
		$('#main').append(
			`<input type="text" id="text${i + 1}" placeholder="Player ${
				i + 1
			}"> </div><br/>`
		);
	}
}
