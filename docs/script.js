var quiz = new Array();
var missedQuestions = new Array();
var grading = false;
var usedAnswers = new Array();
var correctAnswer = "";

function Problem(q, s) {
	this.question = q;
	this.solution = s;
}

window.onload = function() {
	$('body').on('click', '#begin_quiz_button', function(event) {
		event.preventDefault();
		$('#splash').hide();
		$('#results').hide();
		$('#quiz').show();
		beginQuiz();
	});
}

function endQuiz() {
	$('#quiz').hide();
	$('#results').show();

	$('#score').text('Quiz Complete -- ' + Math.round(100 * parseInt($('#numberCorrect').text()) / quiz.length) + '% Correct');
	console.log(missedQuestions.length > 0);
	if (missedQuestions.length > 0) {
		console.log('hello');
		$('#missed').show();
		for (var i = 0; i < missedQuestions.length; i++) {
			var missed = missedQuestions[i];
			$('#questions-to-review').append('<p>' + missed.question + '&mdash;' + missed.solution + '</p>');
		}
	}
}

function beginQuiz() {
	initializeQuestions();
	loadNextQuestion();
	bindMouseOver();
	$('#answers').on('click', '.answer-choice.unselected', answerClicked);
	$('#missed').hide();
	$('#questions-to-review').html('');
}

function loadNextQuestion() {
	if (usedAnswers.length == 0) {
		endQuiz();
		return;
	}
	var answerChoices = new Array(numAnswerChoices);
	for (var i = 0; i < numAnswerChoices; i++) {
		answerChoices[i] = i;
	}
	var randomUsedAnswerIndex = Math.floor(Math.random() * usedAnswers.length);
	var indexOfAnswer = usedAnswers[randomUsedAnswerIndex];
	usedAnswers.splice(randomUsedAnswerIndex, 1);
	$('#question').text(quiz[indexOfAnswer].question);
	$('#question').attr('array-pos', indexOfAnswer);

	var usedAnswerChoices = new Array(quiz.length);
	for (var i = 0; i < usedAnswerChoices.length; i++) {
		usedAnswerChoices[i] = i;
	}
	usedAnswerChoices.splice(indexOfAnswer, 1);

	var randomAnswerChoice = Math.floor(Math.random() * numAnswerChoices);
	var indexOfAnswerChoice = answerChoices[randomAnswerChoice];
	answerChoices.splice(randomAnswerChoice, 1);

	prepAnswerChoices();

	$('#answer' + indexOfAnswerChoice).parent().addClass('correct');
	$('#answer' + indexOfAnswerChoice).text(quiz[indexOfAnswer].solution);

	while (answerChoices.length > 0) {
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

function prepAnswerChoices() {
	$('.answer-choice').removeClass('correct');
	$('.answer-choice').removeClass('incorrect');
}

function initializeQuestions() {
	usedAnswers.length = quiz.length;
	for (var i = 0; i < quiz.length; i++) {
		quiz[i].used = false;
		usedAnswers[i] = i;
	}
	$('#numberRemaining').text(quiz.length);
	$('#numberCorrect').text(0);
	missedQuestions.length = 0;

	numAnswerChoices = (quiz.length >= 4) ? 4 : quiz.length;
	var hideOthers = numAnswerChoices;
	while (hideOthers < 4)
		$('#answer' + (hideOthers++)).parent().hide();
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
	else {
		missedQuestions.push(quiz[$('#question').attr('array-pos')]);
	}

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
