/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works,
 but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount.
 Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object.
 You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. 
There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet.
 If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. 
 If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0.
 This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state.
 If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
"use client"

import { useReducer } from "react";


const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,

}

const reducer = (state: any, action:any) => {
  if (!state.isActive && action.type !== "openAccount") return state;  // user can only select open account if isActive is set to false

  switch(action.type){
    case "openAccount":
      return {...state, isActive:true, balance: 500};
    case "deposit":
      return{...state, balance: state.balance + action.payload};
    case "withdraw":
      return{...state, balance: state.balance - action.payload};
    case "requestLoan":
      return{...state,
         balance: state.loan === 0 ? state.balance + action.payload : state.balance,
         loan: state.loan === 0 ? state.loan + action.payload : state.loan
        };
    case "payLoan":
      return{...state,
          balance: state.loan > 0 ? state.balance - state.loan : state.balance,
          loan: state.loan > 0 ? state.loan - state.loan : state.loan
          };  
    case "closeAccount":
      return{...state,
          isActive: state.balance === 0 && state.loan === 0 ? state.isActive === initialState.isActive : state.isActive 
          };
    default:
      throw new Error("Unknown action!");
  }

}




export default function Home() {


  const [{balance, loan, isActive,}, dispatch] = useReducer(reducer, initialState);


    return(
      <>
      <div className="title">
        <h1> Bank Account </h1>

        <h3>Balance: {balance}</h3>
        <h3>Loan: {loan}</h3>
        <h3>Account status: {isActive ? "true" : "false"}</h3>

        <p>
          <button onClick={() => dispatch({type:"openAccount"})}>
            Open Account
          </button>
        </p>

        <p>
          <button onClick={() => dispatch({type:"deposit", payload: 150})}>
            Deposit 150
          </button>
        </p>

        <p>
          <button onClick={() => dispatch({type:"withdraw", payload: 50})}>
            Withdraw 50
          </button>
        </p>

        <p>
          <button onClick={() => dispatch({type:"requestLoan", payload: 5000})}>
            Take loan of 5000
          </button>
        </p>

        <p>
          <button onClick={() => dispatch({type:"payLoan"})}>
            Pay off loan
          </button>
        </p>

        <p>
          <button onClick={() => dispatch({type:"closeAccount"})}>
            Close account
          </button>
        </p>

      </div>

      </>
    );
  
}
