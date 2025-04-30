import { useState } from "react";
import { Friend } from "./Friend";
import { AddFriend } from "./AddFriend";
import { SplitBill } from "./SplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export type FriendData = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

function App() {
  const [friends, setFriends] = useState<FriendData[]>(initialFriends);
  const [active, setActive] = useState(0);

  function handleAddFriends(friend: FriendData): void {
    setFriends((friends) => [...friends, friend]);
  }

  function handleChangeBalance(id:number, balance:number){
    setFriends((friends) => friends.map(x => x.id === id ? {...x,balance}: x) )
  }

  function handleSetActive(id: number): void {
    setActive(id);
  }

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        onAddFriends={handleAddFriends}
        active={active}
        onSetActive={handleSetActive}
      />
      <SplitBill friends={friends} active={active} onChangeBalance={handleChangeBalance} />
    </div>
  );
}

type SidebarProps = {
  friends: FriendData[];
  active: number;
  onAddFriends: (friend: FriendData) => void;
  onSetActive: (id: number) => void;
};

function Sidebar({ friends, onAddFriends, onSetActive, active }: SidebarProps) {
  const [showForm, setShowForm] = useState(false);

  function toggleform() {
    setShowForm((val) => !val);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((item: FriendData) => (
          <Friend
            data={item}
            key={item.id}
            active={active}
            onSetActive={onSetActive}
          />
        ))}
      </ul>
      <button
        className={`${showForm ? "noshow" : ""} button`}
        onClick={toggleform}
      >
        Add friend
      </button>
      {showForm && (
        <AddFriend onAddFriends={onAddFriends} setShowForm={setShowForm} />
      )}
      <button
        className={`${showForm ? "" : "noshow"} button`}
        onClick={toggleform}
      >
        Close
      </button>
    </div>
  );
}

export default App;
