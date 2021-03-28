function update() {
	var $boxValue = $('input[name="option"]:checked').val();
	const data = {game: $boxValue}
	nodecg.sendMessage('updateBG', data)
}