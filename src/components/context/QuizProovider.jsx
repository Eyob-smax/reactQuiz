import { useEffect, useReducer } from "react";
import { QuizContext } from "../customhooks/useQuiz";

const intialState = {
  questions: [],
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

const ESTIMATED_TIME = 20;
const BASE_URL = "http://localhost:8000/questions";

function reducer(state, { type, payload }) {
  const currentQuestion = state.questions[state.currentIndex];

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * ESTIMATED_TIME,
      };
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
    case "tick":
      return {
        ...state,
        secondRemaining:
          state.secondRemaining > 0 ? state.secondRemaining - 1 : 0,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("No case hit");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      currentIndex,
      answer,
      points,
      highScore,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, intialState);
  useEffect(() => {
    fetch(BASE_URL)
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, [dispatch]);
  return (
    <QuizContext.Provider
      value={{
        questions,
        MAX_POSSIBLE_POINT: questions.reduce(
          (prev, current) => prev + current.points,
          0
        ),
        status,
        currentIndex,
        answer,
        points,
        highScore,
        secondRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
