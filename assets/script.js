//variables
const quizRules = $("#quiz-rules");
const quizBox = $("#quiz-box");
const scoreBox = $("#score-box");
const startQuiz = $("#start-quiz");
const highScores = $("#high-scores-box");

//================ Home Page ================
//quiz box & score box hidden
function homePage() {
    $(quizRules).show(); //quiz rules should show at home
    $(quizBox).hide();
    $(scoreBox).hide();
    $(highScores).hide();
}


//================ Quiz Event ================
//timer countdown starts
function quizEvent() {
    $(quizBox).show();
    $(quizRules).hide();

};
//quiz box shows & quiz rules & score box still hidden

//questions
//object/array format so easier to access 
const questionsArray = [
    {
        q: "What is not an example of a logical operator?",
        c: ["||", "&&", "!", "@@"],
        a: "@@"
    },
    {
        q: "What is an array's values encompassed in?",
        c: [".value.", "<value>", "$value$", "[value]"],
        a: "[value]"
    },
    {
        q: "What language is used to dynamically style and insert elements?",
        c: ["JavaScript", "Java", "HTML", "Fetch API"],
        a: "JavaScript"
    },
    {
        q: "What is used to denote an element in JavaScript?",
        c: ["camelCasing", "tallManLettering", "ScriptCASING", "javaCasing"],
        a: "camelCasing"
    },
    {
        q: "What is the name of a common JavaScript library used to simplify JavaScript programming?",
        c: ["Bootstrap", "jQuery", "Facebook", "CSS"],
        a: "jQuery"
    }
];

//================ End of Quiz ================
//quiz box hideen & score box appears

//================ Store Scores ================
//================ Display High Scores ================


//================ Event Listeners ================
homePage();
//click start button --> quiz event happens
$(startQuiz).on("click", quizEvent)

//select answer buttons

//submit score button

//go back & clear high scores buttons
