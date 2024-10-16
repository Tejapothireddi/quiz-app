const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');

const quizData = [
    {
        question: "What is the capital of France?",
        type: "multiple-choice",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "The Earth is flat.",
        type: "true-false",
        answer: false
    },
    {
        question: "What is Newton's third law of motion.",
        type: "open-ended",
        answer: "Newton's third law of motion states that for every action, there is an equal and opposite reaction. This means that when two objects interact, they apply forces to each other that are equal in magnitude and opposite in direction"
    },
    {
        question: "Identify the animal in the image.",
        type: "image",
        imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", // Use a valid image URL
        answer: "cat"
    }
];

function loadQuiz() {
    quizData.forEach((quizItem, index) => {
        const questionElem = document.createElement('div');
        questionElem.classList.add('question');
        questionElem.innerHTML = `<h3>${index + 1}. ${quizItem.question}</h3>`;
        
        if (quizItem.type === "multiple-choice") {
            quizItem.options.forEach(option => {
                const optionElem = document.createElement('div');
                optionElem.classList.add('option');
                optionElem.innerHTML = `
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                `;
                questionElem.appendChild(optionElem);
            });
        } else if (quizItem.type === "true-false") {
            questionElem.innerHTML += `
                <input type="radio" name="question${index}" value="true"> True
                <input type="radio" name="question${index}" value="false"> False
            `;
        } else if (quizItem.type === "open-ended") {
            questionElem.innerHTML += `<textarea id="answer${index}" rows="3" placeholder="Type your answer here"></textarea>`;
        } else if (quizItem.type === "image") {
            questionElem.innerHTML += `
                <img src="${quizItem.imageUrl}" alt="Quiz Image" style="width:100%;">
                <input type="text" id="answer${index}" placeholder="Type your answer here">
            `;
        }

        quizContainer.appendChild(questionElem);
    });
}

function checkAnswers() {
    let score = 0;
    quizData.forEach((quizItem, index) => {
        let userAnswer;
        if (quizItem.type === "multiple-choice") {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            userAnswer = selectedOption ? selectedOption.value : null;
        } else if (quizItem.type === "true-false") {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            userAnswer = selectedOption ? selectedOption.value === 'true' : null;
        } else if (quizItem.type === "open-ended" || quizItem.type === "image") {
            userAnswer = document.getElementById(`answer${index}`).value.trim();
        }

        if (userAnswer === quizItem.answer) {
            score++;
        }
    });

    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

submitBtn.addEventListener('click', checkAnswers);
loadQuiz();
