import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;

const initalState = {
  questions: [],

  status: "loading", //avilable states: loading, error, ready, active, finished
  index: 0,   //gets current question
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const reducer = (state,action) => {
  switch(action.type){
    case "dataReceieved":
      return { ...state, questions: action.payload, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    case "start":
      return {...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION}
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {...state, answer: action.payload, 
        points: action.payload === question.correctOption ? state.points + question.points : state.points}
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null}
    case "finish":
      return {...state, status:"finished"}
    case "restart":
      return {...initalState, questions: state.questions, status: "ready"}
    case "tick":
      return {...state, secondsRemaining: state.secondsRemaining - 1, 
        status: state.secondsRemaining === 0 ? "finished" : state.status}
    default:
      throw new Error("Action Unknown");
  };
};

export default function App() {

  const [{questions, status, index, answer, points, secondsRemaining}, dispatch] = useReducer(reducer, initalState)

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({type: "dataReceieved", payload: data})
    )
  }, []);



  return(
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader /> }
        {status === "error" && <Error /> }
        {status === "ready" && <StartScreen numQuestions = {numQuestions} dispatch={dispatch}/> }

        {status === "active" && (
          <>
          <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}/>}

      </Main>
    </div>
  )
}