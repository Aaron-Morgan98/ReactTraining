import {combineReducers, createStore} from "redux";

const initalStateAccount ={
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initalStateCustomer ={
    fullName: "",
    NationalId: "",
    createdAt: "",
}

//we set initalState as the default state in the args
const accountReducer = (state = initalStateAccount, action) => {
    switch(action.type){
        //shape of "domain/event name"
        case "account/deposit":
            return{...state, balance: state.balance + action.payload};
        case "account/withdraw":
            return{...state, balance: state.balance - action.payload};
        case "account/requestLoan":
            if(state.loan > 0) return state;
            return{...state, 
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case "account/payLoan":
            return{...state, 
                loan:0, 
                loanPurpose:"", 
                balance: state.balance - state.loan
            };
        default:
            return state; // redux recommends to return original state rather than throw error here
    };
};

const customerReducer = (state = initalStateCustomer, action) => {
    switch(action.type){
        case "customer/createCustomer":
            return{...state, 
                fullName: action.payload.fullName, 
                nationalId: action.payload.nationalId, 
                createdAt: action.payload.createdAt,
            };
        case "customer/updateName":
            return{...state, fullName: action.payload};
        default: 
            return state;
    };

};

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);

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


//action creators(account):
//Not necessary but are a convention. One function per type of action possible
const deposit = (amount) => {
    return {type: "account/deposit", payload: amount};
};

const withdraw = (amount) => {
    return {type: "account/withdraw", payload: amount};
};

const requestLoan = (amount, purpose) => {
    return {
        type: "account/requestLoan", 
        payload: {amount, purpose}
    };
};

const payLoan = () => {
    return {type: "account/payLoan"};
};

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a car"));

console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


//action creators customer

const createCustomer = (fullName, nationalId) => {
    return{
        type: "customer/createCustomer",
        payload: {fullName, nationalId, createdAt: new Date().toISOString()}
    };
};

const updateName = (fullName) => {
    return{type: "account/updateName", payload: fullName};
};


store.dispatch(createCustomer("Aaron Morgan", "12345"));

console.log(store.getState());