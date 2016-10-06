$(document).ready(function() {
	$('#answers > li').click(function(event) {
		$(this).toggleClass('unselected');
	});
});
