const questions = [{
    question: "1. which is the largest animal in the world ?",
    options: [
        {text:"Giraph", correct:false},
        {text:"Whale", correct:true},
        {text:"lion", correct:false},
        {text:"Elephant", correct:false}
    ]
},{
    question: "2. Language used in front end development ?",
    options: [
        {text:"c", correct:false},
        {text:"java", correct:false},
        {text:"javascript", correct:true},
        {text:"python", correct:false}
    ]
}]

const questionEl = document.getElementById("question");
const optionsEl = document.querySelector(".answers-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    nextBtn.innerHTML = "Next";
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    nextBtn.style.display = "none"
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerHTML = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(opt => {
        const button = document.createElement("button");
        button.innerHTML = opt.text;
        button.classList.add("ans-btn");
        
        button.dataset.correct = opt.correct;
        optionsEl.appendChild(button);
        button.addEventListener("click" , checkAns);
    })
}

function checkAns(e){
    const currentButton = e.target;
    const correctAns = currentButton.dataset.correct === "true";
    if(correctAns){
        currentButton.classList.add("correct");
        score++;
    }else{
        currentButton.classList.add("incorrect");
    }
    Array.from(optionsEl.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", ()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else if(currentQuestionIndex === questions.length){
        showScore();
    }else{
        startQuiz();
    }
})
function showScore(){
    questionEl.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    optionsEl.innerHTML = "";
    nextBtn.innerHTML = "Try again";
}
    
startQuiz();