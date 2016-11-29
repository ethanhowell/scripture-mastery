var quiz=[];quiz.push(new Problem("1 Nephi 3:7","I will go and do"));quiz.push(new Problem("2\u00a0Nephi 2:25","Adam fell that men might be"));quiz.push(new Problem("2\u00a0Nephi 2:27","We are free to choose"));quiz.push(new Problem("2\u00a0Nephi 9:28\u201329","Learning is good if we follow God\u2019s counsel"));quiz.push(new Problem("2\u00a0Nephi 25:23, 26","By grace we are saved"));quiz.push(new Problem("2\u00a0Nephi 28:7\u20139","We cannot justify any sin"));
quiz.push(new Problem("2\u00a0Nephi 31:19\u201320","Endure to the end"));quiz.push(new Problem("2\u00a0Nephi 32:3","Feast on the words of Christ"));quiz.push(new Problem("2\u00a0Nephi 32:8\u20139","Ye must pray always"));quiz.push(new Problem("Mosiah 2:17","Serving others serves God"));quiz.push(new Problem("Mosiah 3:19","Natural man is God\u2019s enemy"));quiz.push(new Problem("Mosiah 4:30","Watch your thoughts, words, and deeds"));quiz.push(new Problem("Alma 7:11\u201313","Jesus Christ overcame sin and death"));
quiz.push(new Problem("Alma 32:21","Faith is not a perfect knowledge"));quiz.push(new Problem("Alma 37:35","Learn in thy youth to keep the commandments"));quiz.push(new Problem("Alma 39:9","Go no more after the lust of your eyes"));quiz.push(new Problem("Alma 41:10","Wickedness never was happiness"));quiz.push(new Problem("Helaman 5:12","Build your foundation on Christ"));quiz.push(new Problem("3\u00a0Nephi 12:48","Ye should be perfect"));quiz.push(new Problem("3\u00a0Nephi 18:15, 20\u201321","Watch and pray always"));
quiz.push(new Problem("Ether 12:6","Witness comes after the trial of faith"));quiz.push(new Problem("Ether 12:27","Weak things become strong"));quiz.push(new Problem("Moroni 7:41","Have hope through the Atonement of Christ"));quiz.push(new Problem("Moroni 7:45, 47\u201348","Charity suffereth long"));quiz.push(new Problem("Moroni 10:4\u20135","The Holy Ghost reveals truth"));var missedQuestions=[],grading=!1,usedAnswers=[],correctAnswer="";function Problem(a,b){this.question=a;this.solution=b}
window.onload=function(){$("body").on("click","#begin_quiz_button",function(a){a.preventDefault();$("#splash").hide();$("#results").hide();$("#quiz").show();beginQuiz()})};
function endQuiz(){$("#quiz").hide();$("#results").show();$("#score").text("Quiz Complete -- "+Math.round(100*parseInt($("#numberCorrect").text())/quiz.length)+"% Correct");console.log(0<missedQuestions.length);if(0<missedQuestions.length){console.log("hello");$("#missed").show();for(var a=0;a<missedQuestions.length;a++){var b=missedQuestions[a];$("#questions-to-review").append("<p>"+b.question+"&mdash;"+b.solution+"</p>")}}}
function beginQuiz(){initializeQuestions();loadNextQuestion();bindMouseOver();$("#answers").on("click",".answer-choice.unselected",answerClicked);$("#missed").hide();$("#questions-to-review").html("")}
function loadNextQuestion(){if(0==usedAnswers.length)endQuiz();else{for(var a=Array(numAnswerChoices),b=0;b<numAnswerChoices;b++)a[b]=b;var c=Math.floor(Math.random()*usedAnswers.length),d=usedAnswers[c];usedAnswers.splice(c,1);$("#question").text(quiz[d].question);$("#question").attr("array-pos",d);for(var e=Array(quiz.length),b=0;b<e.length;b++)e[b]=b;e.splice(d,1);c=Math.floor(Math.random()*numAnswerChoices);b=a[c];a.splice(c,1);prepAnswerChoices();$("#answer"+b).parent().addClass("correct");for($("#answer"+
b).text(quiz[d].solution);0<a.length;)c=Math.floor(Math.random()*a.length),b=a[c],a.splice(c,1),c=Math.floor(Math.random()*e.length),d=e[c],e.splice(c,1),$("#answer"+b).parent().addClass("incorrect"),$("#answer"+b).text(quiz[d].solution)}}function prepAnswerChoices(){$(".answer-choice").removeClass("correct");$(".answer-choice").removeClass("incorrect")}
function initializeQuestions(){usedAnswers.length=quiz.length;for(var a=0;a<quiz.length;a++)quiz[a].used=!1,usedAnswers[a]=a;$("#numberRemaining").text(quiz.length);$("#numberCorrect").text(0);missedQuestions.length=0;for(a=numAnswerChoices=4<=quiz.length?4:quiz.length;4>a;)$("#answer"+a++).parent().hide()}function answerClicked(){$(this).removeClass("mouse-hovering");grading||(grading=!0,$(this).toggleClass("unselected"),grade($(this)),setTimeout(prepareForNextQuestion,2E3))}
function prepareForNextQuestion(){grading=!1;$(".answer-choice").removeClass("incorrect").removeClass("correct").addClass("unselected");loadNextQuestion()}function grade(a){var b=$("#numberRemaining").text();$("#numberRemaining").text(--b);b=$("#numberCorrect").text();a.hasClass("correct")?$("#numberCorrect").text(++b):missedQuestions.push(quiz[$("#question").attr("array-pos")])}
function bindMouseOver(){$("#answers").on("mouseenter",".answer-choice",function(){grading||$(this).addClass("mouse-hovering")});$("#answers").on("mouseleave",".answer-choice",function(){grading||$(this).removeClass("mouse-hovering")})};