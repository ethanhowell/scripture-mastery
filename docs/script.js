var grading = false;

window.onload = function() {
	bindMouseOver();
	$('#answers').on('click', '.answer-choice.unselected', answerClicked);
}

function bindMouseOver() {
	$('#answers').on('mouseover', '.answer-choice', function() {
		$(this).addClass('mouse-hovering');
		console.log($(this));
	});

	$('#answers').on('mouseout', '.answer-choice', function() {
		$(this).removeClass('mouse-hovering');
	});
}

function answerClicked() {
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
