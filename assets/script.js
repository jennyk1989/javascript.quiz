//variables
const quizRules = $("#quiz-rules");
const quizBox = $("#quiz-box");
const scoreBox = $("#score-box");
const startQuiz = $("#start-quiz");
const highScores = $("#high-scores-box");

homePage();
//================ Home Page ================
//quiz box & score box hidden
function homePage() {
    $(quizRules).show(); //quiz rules should show at home
    $(".navbar-item").show();
    $(quizBox).hide();
    $(scoreBox).hide();
    $(highScores).hide();
};

//click start button --> quiz event happens
$(startQuiz).on("click", quizEvent);

//================ Quiz Event ================
//relevant variables defined
const questionTitle = $("#quiz-questions");
const btnOne = $("#button-one");
const btnTwo = $("#button-two");
const btnThree = $("#button-three");
const btnFour = $("#button-four");
const questChoices = $("question-choices");
let totalTime = 30; //start quiz with 30 seconds
let iQuestion = 0; //index for questions

function quizEvent() {
    iQuestion = 0; //questions start off a first question in the questionsArray
    //quiz box shows & quiz rules & score box still hidden
    $(quizBox).show();
    $(quizRules).hide();
    $(questionTitle).empty();
    // $(userInput).text("");
    //timer
    let countdownTimer = setInterval(function() {
        totalTime--; //subtract time by one sec (or 1000 milliseconds)
        $("#countdown-timer").text(totalTime + "sec"); //update the timer with the current time left
        
        
        if(iQuestion >= 5 || totalTime <= 0) {
            clearInterval(countdownTimer);
            showScores();
        }
    }, 1000);
    showQuestion(iQuestion);
    
};

function showQuestion() {
    $(questionTitle).text("");
    $(btnOne).text("");
    $(btnTwo).text("");
    $(btnThree).text("");
    $(btnFour).text("");

    $(questionTitle).text(JSON.stringify(questionsArray[iQuestion].quest));
    //append answer choice to the coorisponding buttons
    $(btnOne).append(JSON.stringify(questionsArray[iQuestion].choice[0])); //appends answer choices to buttons from an object as a string
    $(btnTwo).append(JSON.stringify(questionsArray[iQuestion].choice[1])); 
    $(btnThree).append(JSON.stringify(questionsArray[iQuestion].choice[2])); 
    $(btnFour).append(JSON.stringify(questionsArray[iQuestion].choice[3])); 
};



//questions
//object/array format so easier to access 
const questionsArray = [
    {
        quest: "What is NOT an example of a logical operator?",
        choice: ["||", "&&", "!", "***"],
        ans: "4"
    },
    {
        quest: "What is used to encompass an array's values?",
        choice: ["periods", "exclamations", "dollar signs", "brackets"],
        ans: "4"
    },
    {
        quest: "What language is used to dynamically style and insert elements?",
        choice: ["JavaScript", "Java", "HTML", "Fetch API"],
        ans: "1"
    },
    {
        quest: "What is used to denote an element in JavaScript?",
        choice: ["camelCasing", "tallManLettering", "ScriptCASING", "javaCasing"],
        ans: "1"
    },
    {
        quest: "What is the name of a common JavaScript library used to simplify JavaScript programming?",
        choice: ["Bootstrap", "jQuery", "Facebook", "CSS"],
        ans: "2"
    },
    {
        quest: "What does JS stand for?",
        choice: ["JavaScreen", "JavaStyle", "JavaShow", "JavaScript"],
        ans: "4"
    },
    {
        quest: "GOOD JOB!!!!!",
        choice: ["good job!!!!", "good job!!!", "good job!!", "good job!"],
        ans: "4c"
    }
];

//event listener is in the HTML and executes checkAnswerChoice on "click"
//check if user answer choice is correct
function checkAnswerChoice(answer) {
    if (questionsArray[iQuestion].ans === answer) {
        //add to score/time
        totalTime += 10;
    } else {
        //reduce score/time
        totalTime -= 5; 
    };
    iQuestion++
    showQuestion(iQuestion); //go back to show next question
};

//================ End of Quiz ================
//relevant variables
const finalScore = $("#final-score");

//quiz box hiden & score box appears
function showScores() {
    $(quizBox).hide();
    $(scoreBox).show();
    $(finalScore).empty();
    $(finalScore).text("Final Score: " + totalTime); //time left at end of quiz equals the score

    let displayedScoresArray = JSON.parse(localStorage.getItem("storedScores")) //get previous user name and scores out of storage so new data can be added to it

    $("#submit-score").on("click", function() {
        //take user's name from input
        let userData = {
            name: $("#userInput")[0].value,
            score: totalTime
        }
        console.log(userData);
        if (displayedScoresArray === null) {
            displayedScoresArray = [userData]; 
            localStorage.setItem("storedScores", JSON.stringify(displayedScoresArray));
            displayScores();
        } else {
            displayedScoresArray.push(userData); //pushes new userData into the array of past userData
            localStorage.setItem("storedScores", JSON.stringify(displayedScoresArray));
            displayScores();
        }
    });
};

//================ Store Scores ================
const submitScore = $("#submit-score");
const highScoresList = $("#high-scores-list");

//================ Display High Scores ================
//relevant variables
const goBack = $("#go-back"); //button for going back to home page
const clearScores = $("#clear-scores"); //button for clear the list of high scores


function displayScores() {
    $(quizRules).hide();
    $(scoreBox).hide();
    $(highScores).show();
    //get user data out of local storage (returns as a string so use JSON.parse to get it back into object form)
    let savedScores =  JSON.parse(localStorage.getItem("storedScores"));
    console.log(savedScores);
    
    if (savedScores === null) {
        return;
    };
    //for each key/value pair in savedScores, append it to the DOM 
    for (let indexS = 0; indexS < savedScores.length; indexS++ ) {
        let storageName = savedScores[indexS].name; //indexS will refer to each name & score that's present 
        let storageScore = savedScores[indexS].score; 
        $(highScoresList).append("<p>" + "NAME: " + storageName + "&nbsp&nbsp&nbsp&nbsp  SCORE: " + storageScore + "</p>");
        //.attr("class", "is-justify-content-space-around");  
        //$("#high-scores-list").append("<p>" + "Name: " + JSON.stringify(scoresStorage[indexS].name) + " Score: " + scoresStorage[indexS].score + "</p>");

    }

    localStorage.setItem("storedScores", JSON.stringify(savedScores)); //put it back in local storage after append for later use

};

//================ Event Listeners ================
$("#go-back").on("click", function() {
    window.location.reload(); //tells page to reload so quiz is reset
})

const highScoreButton = $("#highscore-button");
//view high Scores button
$(highScoreButton).on("click", displayScores);

//clear scores button
$(clearScores).on("click", function() {
    localStorage.removeItem("storedScores");
    $("#high-scores-list").empty();
});
