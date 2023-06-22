import React from "react";
import { dbService } from "../fbase";

const Aweet = ({ aweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this aweet?");
    if (ok) {
      // delete aweet
      await dbService.doc(`aweets/${aweetObj.id}`).delete();
    }
  };
  return (
    <div>
      <h4>{aweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Aweet</button>
          <button>Edit Aweet</button>
        </>
      )}
    </div>
  );
};

export default Aweet;
