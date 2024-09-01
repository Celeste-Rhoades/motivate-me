const newAnswerButton = document.querySelector("#newAnswerButton");
const answerAuthorInput = document.querySelector("#answerAuthorInput");
const answerTextInput = document.querySelector("#answerTextInput");
const errorArea = document.querySelector("#errorArea");

newQuestionButton.addEventListener("click", getNewQuestion);

newAnswerButton.addEventListener("click", event => {
  event.preventDefault(); // Prevent default form submission
  putNewAnswer();
});

async function getNewQuestion() {
  window.location.reload();
}

async function putNewAnswer() {
  if (!answerTextInput.value) {
    errorArea.innerText = "Error: answer field cannot be empty.";
  } else {
    errorArea.innerText = "Answer posted successfully.";

    const questionId = questionArea.dataset.questionid;
    const author = answerAuthorInput.value;
    const answerText = answerTextInput.value;

    const requestBody = JSON.stringify({
      id: questionId,
      answer: {
        author: author,
        answerText: answerText,
      },
    });

    const response = await fetch("/question/answer", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: requestBody,
    });

    console.log(response);
  }
}
