function update() {
	var $boxValue = $('input[name="option"]:checked').val();
	const data = {game: $boxValue}
	nodecg.sendMessage('updateBG', data)
}

function refresh() {

	$('#refreshButton').attr('disabled', true);
	setTimeout(() => {$('#refreshButton').attr('disabled', false)}, 5000);

	nodecg.sendMessage('refresh');
}