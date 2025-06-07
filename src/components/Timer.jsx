import { useEffect } from "react";
import useQuiz from "./customhooks/useQuiz";

export default function Timer() {
  const { dispatch, secondRemaining } = useQuiz();
  const minutes = Math.floor(secondRemaining / 60);
  const second = secondRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes}:
      {second < 10 ? "0" + second : second}
    </div>
  );
}
