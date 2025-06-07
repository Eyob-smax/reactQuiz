import useQuiz from "./customhooks/useQuiz";

export default function NextButton() {
  const { currentIndex, questions, dispatch, answer } = useQuiz();
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        currentIndex >= questions.length - 1
          ? dispatch({ type: "finished" })
          : dispatch({ type: "nextQuestion" })
      }
    >
      {currentIndex >= questions.length - 1 ? "Finish" : "Next"}
    </button>
  );
}
