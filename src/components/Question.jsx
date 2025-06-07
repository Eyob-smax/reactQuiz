import useQuiz from "./customhooks/useQuiz";
import Options from "./Options";
export default function Question() {
  const { questions, currentIndex } = useQuiz();
  return (
    <div className="">
      {" "}
      <h4>{questions[currentIndex]?.question}</h4>
      <Options />
    </div>
  );
}
