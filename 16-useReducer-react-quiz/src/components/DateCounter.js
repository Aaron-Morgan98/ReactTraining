import { useState, useReducer } from "react";

const initalState = {count: 0, step: 1};

function reducer(state,action){
  console.log(state,action);

  switch(action.type){
    case "dec":
      return {...state, count: state.count - state.step};
    case "inc":
      return {...state, count: state.count + state.step};
    case "setCount":
      return {...state, count:action.payload};
    case "setStep":
      return{...state, step: action.payload};
    case "reset":
      return {count: 0, step: 1};
    default:
      throw new Error("Unknown action");
  }
  // if(action.type === "inc") return state + action.payload
  // if(action.type === "dec") return state - action.payload
  // if(action.type === "setCount") return action.payload
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // first arg is a fucntion and second arg is intial state
  const [state, dispach] = useReducer(reducer, initalState);
  const{count, step} = state;


  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispach({type: "dec", payload: -1});

    // setCount((count) => count - 1);
   // setCount((count) => count - step);
  };

  const inc = function () {
    dispach({type: "inc", payload: 1});

    // setCount((count) => count + 1);
   // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispach({type: "setCount", payload: Number(e.target.value)});

   // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispach({type:"setStep", payload: Number(e.target.value)});
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    //useReducer allows us to set multiple pieces of state at teh same time
    dispach({type:"reset"});

   // setCount(0);
   // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
