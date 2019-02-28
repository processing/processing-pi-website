$(document).ready(function () {
	$('.shell-copy').click(function () {
		const command = $('.shell-command').text();
		const textArea = $('<textarea>');
		textArea.val(command);
		$('body').append(textArea);
		textArea.select();
		document.execCommand('copy');
		textArea.remove();
	})
})