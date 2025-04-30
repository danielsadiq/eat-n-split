import { useState } from "react";
import { FriendData } from "./App";

type SplitBillProps = {
  friends: FriendData[]; 
  active: number;
  onChangeBalance: (id:number,balance:number) => void
}

export function SplitBill({ friends, active, onChangeBalance }: SplitBillProps) {
  const friend: FriendData = friends.filter(x => x.id === active)[0];
  
  const [bill, setBill] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  const [payer, setPayer] = useState("you");
  const otherExpense = bill - myExpense;
  const newVal = payer == "you" ? otherExpense : myExpense * -1;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (bill === 0) return;
    const balance = newVal + friend.balance;
    onChangeBalance(friend.id, balance);

  }

  if (!friend) return;

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💰Bill value</label>
      <input value={bill} onChange={(e)=>setBill(Number(e.target.value))} />

      <label>🕴Your expense</label>
      <input value={myExpense} onChange={(e)=>setMyExpense(Number(e.target.value))} />

      <label>👭{friend.name}'s value</label>
      <input value={otherExpense} />

      <label>🤑 Who is paying the bill </label>
      <select value={payer} onChange={(e)=>setPayer(e.target.value)}>
        <option value={"you"}>You</option>
        <option value={"other"}>{friend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
