import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action){  //same as the legacy redux "account/deposit" case
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state,action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose){ //this is needed when the reducer takes in more than 1 payload
                return{
                    payload: {amount, purpose},
                };
            },                
            reducer(state,action){
            if(state.loan > 0) return;

            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance += action.payload.amount;
            },
        },
        payLoan(state){
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state){
            state.isLoading = true;

        },
    },
});




export const {withdraw,requestLoan,payLoan,} = accountSlice.actions;

export function deposit(amount, currency){
        if(currency === "USD") return {type: "account/deposit", payload: amount};
    
        //redux will release this is middle ware automatically becuase of thunks.
        // this function will be called before we dispatch an action to the state
        return async function(dispatch, getState) {
           dispatch({type:"account/convertingCurrency"});
    
           await fetch(
            `https://api.frankfurter.app/latest?base=${currency}&symbols=USD`
            )
            .then((res) => res.json())
            .then((data) => {
              const convertedAmount = (amount * data.rates["USD"])
              console.log(data);
              console.log(convertedAmount);
    
              dispatch({type: "account/deposit", payload: convertedAmount});
            });
        };
    };

export default accountSlice.reducer;


// below is how to create a slice with legacy redux

//we set initalState as the default state in the args
// export default function accountReducer(state = initalState, action){
//     switch(action.type){
//         //shape of "domain/event name"
//         case "account/deposit":
//             return{...state, balance: state.balance + action.payload, isLoading: false};
//         case "account/withdraw":
//             return{...state, balance: state.balance - action.payload};
//         case "account/requestLoan":
//             if(state.loan > 0) return state;
//             return{...state, 
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };
//         case "account/payLoan":
//             return{...state, 
//                 loan:0, 
//                 loanPurpose:"", 
//                 balance: state.balance - state.loan
//             };
//         case "account/convertingCurrency":
//             return {...state, isLoading: true};
//         default:
//             return state; // redux recommends to return original state rather than throw error here
//     };
// };

// //action creators(account):
// //Not necessary but are a convention. One function per type of action possible
// export function deposit(amount, currency){
//     if(currency === "USD") return {type: "account/deposit", payload: amount};

//     //redux will release this is middle ware automatically becuase of thunks.
//     // this function will be called before we dispatch an action to the state
//     return async function(dispatch, getState) {
//        dispatch({type:"account/convertingCurrency"});

//        await fetch(
//         `https://api.frankfurter.app/latest?base=${currency}&symbols=USD`
//         )
//         .then((res) => res.json())
//         .then((data) => {
//           const convertedAmount = (amount * data.rates["USD"])
//           console.log(data);
//           console.log(convertedAmount);

//           dispatch({type: "account/deposit", payload: convertedAmount});
//         });



//     };

    
// };

// export function withdraw(amount){
//     return {type: "account/withdraw", payload: amount};
// };

// export function requestLoan(amount, purpose){
//     return {
//         type: "account/requestLoan", 
//         payload: {amount, purpose}
//     };
// };

// export function payLoan(){
//     return {type: "account/payLoan"};
// };

