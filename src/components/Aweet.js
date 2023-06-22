import React, { useState } from "react";
import { dbService } from "../fbase";

const Aweet = ({ aweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newAweet, setNewAweet] = useState(aweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this aweet?");
    if (ok) {
      // delete aweet
      await dbService.doc(`aweets/${aweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(aweetObj, newAweet);
    // update aweet
    await dbService.doc(`aweets/${aweetObj.id}`).update({
      text: newAweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewAweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your aweet"
              value={newAweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Aweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{aweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Aweet</button>
              <button onClick={toggleEditing}>Edit Aweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Aweet;
