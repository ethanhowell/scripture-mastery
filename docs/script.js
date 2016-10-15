var grading = false;

window.onload = function() {
	initializeQuestions();
	bindMouseOver();
	$('#answers').on('click', '.answer-choice.unselected', answerClicked);
}

function loadNextQuestion() {
	//TODO: Function Body
}

function initializeQuestions() {
	//TODO: Body
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

function bindMouseOver() {
	$('#answers').on('mouseenter', '.answer-choice', function() {
		if (!grading)
			$(this).addClass('mouse-hovering');
	});

	$('#answers').on('mouseleave', '.answer-choice', function() {
		if (!grading)
			$(this).removeClass('mouse-hovering');
	});
}
