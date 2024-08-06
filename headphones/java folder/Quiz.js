function check your Answer() 
    const correctAnswer = '4';
    const userAnswer = document.querySelector('input[name="quiz"]:checked').value;

    if (userAnswer === correctAnswer) {
        document = getElementById('feedback').textContent = "Correct answer Well done.";
    } else {
        document = getElementById('feedback').textContent = " incorrect. Try again!";
    }

const submitButton = document.getElementById("Submit the answer");
submitButton.addanEventListener("click", check your Answer);