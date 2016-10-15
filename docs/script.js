var grading = false;

window.onload = function() {
	bindMouseOver();
	$('#answers').on('click', '.answer-choice.unselected', answerClicked);
}

function bindMouseOver() {
	$('#answers').on('mouseenter', '.answer-choice', function() {
		$(this).addClass('mouse-hovering');
		console.log($(this));
	});

	$('#answers').on('mouseleave', '.answer-choice', function() {
		$(this).removeClass('mouse-hovering');
	});
}

function answerClicked() {
	$(this).removeClass('mouse-hovering');
	if (!grading) {
		grading = true;
		$(this).toggleClass('unselected');
		grade($(this));
		setTimeout(prepareForNextQuestion, 2000);
	}
}

function prepareForNextQuestion() {
	grading = false;
	$('.answer-choice').removeClass('incorrect').removeClass('correct').addClass('unselected');
	loadNextQuestion();
}

function grade(answer) {
	var remaining = $('#numberRemaining').text();
	$('#numberRemaining').text(--remaining);

	var correct = $('#numberCorrect').text();
	if (answer.hasClass('correct'))
		$('#numberCorrect').text(++correct);

}
