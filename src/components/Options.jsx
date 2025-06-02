export default function Options({ question, dispatch, answer }) {
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
