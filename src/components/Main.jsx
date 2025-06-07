import useQuiz from "./customhooks/useQuiz";
import Error from "./Error";
import StartScreen from "./StartScreen";
import FinishedScreen from "./FinishScreen";
import Progress from "./Progress";
import Loader from "./Loader";
import Footer from "./Footer";
import Question from "./Question";
export default function Main() {
  const { status } = useQuiz();

  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "ready" && <StartScreen />}
      {status === "error" && <Error />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer />
        </>
      )}
      {status === "finished" && <FinishedScreen />}
    </main>
  );
}
