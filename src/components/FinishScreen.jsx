import useQuiz from "./customhooks/useQuiz";

export default function FinishedScreen() {
  const { points, MAX_POSSIBLE_POINT, highScore, dispatch } = useQuiz();
  const percentage = (points / MAX_POSSIBLE_POINT) * 100;
  let emoji = "";
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥳";
  if (percentage >= 20 && percentage < 50) emoji = "🥺";
  if (percentage < 10) emoji = "😭";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {MAX_POSSIBLE_POINT}({Math.ceil(percentage)})
      </p>
      <p className="highscore">Highscore: {highScore} points</p>
      <button
        onClick={() => dispatch({ type: "restartQuiz" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}
