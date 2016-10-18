var quiz;
var grading = false;
var usedAnswers = new Array();
var correctAnswer = "";

function Problem(q, s) {
	this.question = q;
	this.solution = s;
}

window.onload = function() {
	initializeQuestions();
	loadNextQuestion();
	bindMouseOver();
	$('#answers').on('click', '.answer-choice.unselected', answerClicked);
}

function loadNextQuestion() {
	if (usedAnswers.length == 0) {
		alert('Quiz Complete');
	}
	var answerChoices = new Array(4);
	for (var i = 0; i < 4; i++) {
		answerChoices[i] = i;
	}
	var randomUsedAnswerIndex = Math.floor(Math.random() * usedAnswers.length);
	var indexOfAnswer = usedAnswers[randomUsedAnswerIndex];
	usedAnswers.splice(randomUsedAnswerIndex, 1);
	$('#question').text(quiz[indexOfAnswer].question);

	var usedAnswerChoices = usedAnswers.slice();

	var randomAnswerChoice = Math.floor(Math.random() * 4);
	var indexOfAnswerChoice = answerChoices[randomAnswerChoice];
	answerChoices.splice(randomAnswerChoice, 1);

	$('#answer' + indexOfAnswerChoice).parent().addClass('correct');
	$('#answer' + indexOfAnswerChoice).text(quiz[indexOfAnswer].solution);

	while (answerChoices.length > 0) {
		console.log(answerChoices)
		randomAnswerChoice = Math.floor(Math.random() * answerChoices.length);
		indexOfAnswerChoice = answerChoices[randomAnswerChoice];
		answerChoices.splice(randomAnswerChoice, 1);

		randomUsedAnswerIndex = Math.floor(Math.random() * usedAnswerChoices.length);
		indexOfAnswer = usedAnswerChoices[randomUsedAnswerIndex];
		usedAnswerChoices.splice(randomUsedAnswerIndex, 1);

		$('#answer' + indexOfAnswerChoice).parent().addClass('incorrect');
		$('#answer' + indexOfAnswerChoice).text(quiz[indexOfAnswer].solution);
	}
}

function initializeQuestions() {
	usedAnswers.length = quiz.length;
	for (var i = 0; i < quiz.length; i++) {
		quiz[i].used = false;
		usedAnswers[i] = i;
	}
	$('#numberRemaining').text(quiz.length);
	$('#numberCorrect').text(0);
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
