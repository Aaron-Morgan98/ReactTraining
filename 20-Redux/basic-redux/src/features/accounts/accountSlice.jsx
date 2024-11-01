

const initalStateAccount ={
    balance: 0,
    loan: 0,
    loanPurpose: "",
};


//we set initalState as the default state in the args
export default function accountReducer(state = initalStateAccount, action){
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

//action creators(account):
//Not necessary but are a convention. One function per type of action possible
export function deposit(amount){
    return {type: "account/deposit", payload: amount};
};

export function withdraw(amount){
    return {type: "account/withdraw", payload: amount};
};

export function requestLoan(amount, purpose){
    return {
        type: "account/requestLoan", 
        payload: {amount, purpose}
    };
};

export function payLoan(){
    return {type: "account/payLoan"};
};

