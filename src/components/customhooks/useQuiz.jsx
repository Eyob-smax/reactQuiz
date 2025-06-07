import { createContext, useContext } from "react";

export const QuizContext = createContext();

export default function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("Quiz context is used outside of the provider wrapper");
  }
  return context;
}
