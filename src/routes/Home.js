import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import Aweet from "../components/Aweet";

const Home = ({ userObj }) => {
  const [aweet, setAweet] = useState("");
  const [aweets, setAweets] = useState([]);

  useEffect(() => {
    dbService.collection("aweets").onSnapshot((snapshot) => {
      const aweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAweets(aweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "aweets"), {
      text: aweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
      <div>
        {aweets.map((aweet) => (
          <Aweet
            key={aweet.id}
            aweetObj={aweet}
            isOwner={aweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
