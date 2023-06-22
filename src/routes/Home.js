import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [aweet, setAweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "aweets"), {
      aweet,
      createdAt: Date.now(),
    });
    setAweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setAweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={aweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Aweet" />
      </form>
    </div>
  );
};
export default Home;
