import React, { useReducer, useState } from "react";

type Action =
  | { type: "deposit"; amount: number }
  | { type: "withdraw"; amount: number };

type State = {
  balance: number;
};

const initialState: State = {
  balance: 0,
};

// Reducer Function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "deposit":
      return { balance: state.balance + action.amount };
    case "withdraw":
      return {
        balance:
          state.balance >= action.amount
            ? state.balance - action.amount
            : state.balance,
      };
    default:
      throw new Error("Unavailable");
  }
};

const BankApp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputAmt, setInputAmt] = useState<string>("");

  const handleDeposit = () => {
    const amount = parseFloat(inputAmt);
    if (amount > 0) {
      dispatch({ type: "deposit", amount });
    } else {
      alert("Please enter the amount to be deposited");
    }
    setInputAmt("");
  };

  const handleWithdraw = () => {
    const amount = parseFloat(inputAmt);
    if (amount > 0) {
      if (state.balance >= amount) {
        dispatch({ type: "withdraw", amount });
      } else {
        alert("Insufficient Balance");
      }
      setInputAmt("");
    }
  };

  return (
    <div className="content-app">
      <h1>Banking App</h1>
      <h2>Current Balance: ₹{state.balance} </h2>
      <div className="subContent-app">
        <div>Please enter the amount here:</div>
        <input
          type="number"
          value={inputAmt}
          onChange={(e) => setInputAmt(e.target.value)}
          placeholder="Enter amount"
          className="input-app"
        />
        <div>
          <button className="btn-app" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="btn-app" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankApp;
