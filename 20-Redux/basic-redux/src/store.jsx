import {combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";



const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);

export default store;























//example of using redux without action creators

// store.dispatch({type: "account/deposit", payload: 500});
// store.dispatch({type: "account/withdraw", payload: 200});
// store.dispatch({
//     type: "account/requestLoan", 
//     payload: {amount: 1000, purpose: "Buy a car"}
// });

// console.log(store.getState());

// store.dispatch({type:"account/payLoan"});
// console.log(store.getState());


// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(1000, "Buy a car"));

// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());





// store.dispatch(createCustomer("Aaron Morgan", "12345"));

// console.log(store.getState());