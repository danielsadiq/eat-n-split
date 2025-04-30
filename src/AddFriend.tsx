import { Dispatch, SetStateAction, useState } from "react";
import { FriendData } from "./App";

export type AddFriendProps = {
  onAddFriends: (friend:FriendData) => void;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export function AddFriend({ onAddFriends, setShowForm }: AddFriendProps) {
  const [name, setName] = useState("");
  const id = Date.now();

  const image = `https://i.pravatar.cc/48?u=${id}`;
  const newItem = { id, name, image, balance: 0 };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "") return;
    onAddFriends(newItem);
    setShowForm((show: boolean) => !show);
  };

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>👫Friend name</label> <input value={name} onChange={(e) => setName(e.target.value)} />
    <label>🌆Image URL</label> <input value={image} />
    <button className="button" type="submit">Add</button>
  </form>;
}
