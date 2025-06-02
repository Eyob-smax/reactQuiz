export default function NextButton({ index, numQuestions, dispatch, answer }) {
  console.log(index, numQuestions);
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        index >= numQuestions - 1
          ? dispatch({ type: "finished" })
          : dispatch({ type: "nextQuestion" })
      }
    >
      {index >= numQuestions - 1 ? "Finish" : "Next"}
    </button>
  );
}
