export default function StartScreen({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{length} questions to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}
