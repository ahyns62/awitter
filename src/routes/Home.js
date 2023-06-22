import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [aweet, setAweet] = useState("");
  const [aweets, setAweets] = useState([]);
  
  const getAweets = async () => {
    const dbAweets = await dbService.collection("aweets").get();
    dbAweets.forEach((document) => {
      const aweetObject = {
        ...document.data(),
        id: document.id,
      };
      setAweets((prev) => [aweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getAweets();
  }, []);

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
      <div key={aweet.id}>
        {aweets.map((aweet) => (
          <div>
            <h4>{aweet.aweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
