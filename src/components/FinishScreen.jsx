export default function FinishedScreen({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
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
        {maxPossiblePoints}({Math.ceil(percentage)})
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
