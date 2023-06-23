import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Aweet = ({ aweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newAweet, setNewAweet] = useState(aweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this aweet?");
    if (ok) {
      // delete aweet
      await dbService.doc(`aweets/${aweetObj.id}`).delete();
      if (aweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(aweetObj.attachmentUrl).delete();
      }
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
    <div className="aweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container aweetEdit">
            <input
              type="text"
              placeholder="Edit your aweet"
              value={newAweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Aweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{aweetObj.text}</h4>
          {aweetObj.attachmentUrl && <img src={aweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="aweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Aweet;
