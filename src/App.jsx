import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Options from "./components/Options";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishScreen";

const intialState = {
  questions: [],
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, { type, payload }) {
  const currentQuestion = state.questions[state.currentIndex];

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return {
        ...state,
        answer: payload,
        points:
          currentQuestion.correctOption === payload
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points >= state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...intialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("No case hit");
  }
}

function App() {
  const [
    { questions, status, currentIndex, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, intialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const MAX_POSSIBLE_POINT = questions.reduce(
    (prev, current) => prev + current.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={currentIndex}
              numQuestions={questions.length}
              points={points}
              maxPoints={MAX_POSSIBLE_POINT}
              answer={answer}
            />
            <Question>
              <h4>{questions[currentIndex]?.question}</h4>
              <Options
                question={questions[currentIndex]}
                dispatch={dispatch}
                answer={answer}
              />
            </Question>
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={currentIndex}
              numQuestions={questions.length}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPossiblePoints={MAX_POSSIBLE_POINT}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
