import useQuiz from "./customhooks/useQuiz";

export default function Progress() {
  const { currentIndex, points, answer, questions, MAX_POSSIBLE_POINT } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={currentIndex + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{currentIndex + 1}</strong> / {questions.length}
      </p>

      <p>
        <strong>
          {points} / {MAX_POSSIBLE_POINT}
        </strong>
      </p>
    </header>
  );
}
