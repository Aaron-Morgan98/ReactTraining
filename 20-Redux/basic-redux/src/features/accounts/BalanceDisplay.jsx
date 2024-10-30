import {connect} from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}


//OLD WAY TO MAP STATE IN REDUX (just doing it here as may see it used in older redux code basers before toolkit was introduced)
function mapStateToProps(state){
  return{
    balance: state.account.balance
  }
}

export default connect(mapStateToProps) (BalanceDisplay);
