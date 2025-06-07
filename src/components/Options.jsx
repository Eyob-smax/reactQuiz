import useQuiz from "./customhooks/useQuiz";

export default function Options() {
  const { answer, questions, currentIndex, dispatch } = useQuiz();
  const question = questions[currentIndex];
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer === null
              ? ""
              : index === question.correctOption
              ? "correct"
              : "wrong"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
