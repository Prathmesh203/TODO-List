import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { createFolder } from "../Services/folderServices";
import { UseGlobalContext } from "../context/context";
import { ImCross } from "react-icons/im";

function AddFolder({ setFilters }) {
  const [name, setName] = useState("");
  const context = UseGlobalContext();
  const popup = context.folderPopup;
  const setPopup = context.setFolderPopup;

  async function handleClick() {
    if (!name.trim()) {
      alert("Folder name cannot be empty.");
      return;
    }
    const folderName = {
      folderName: name,
    };
    try {
      const data = await createFolder(folderName);
      setName("");
      setFilters((prev) => (prev.length == 0 ? [data] : [...prev, data]))
      return;
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder. Please try again.");
      return;
    } finally {
      setPopup(false);
      return;
    }
  }
  function closePopup() {
    setPopup(false);
  }

  return (
    <>
      {popup && (
        <div className="border rounded p-3 ">
          <button className="relative left-[90%]  " onClick={closePopup}>
            <ImCross />
          </button>
          <h1 className="font-bold text-lg mb-2 inline ">Add New Folder</h1>
          <label htmlFor="name" className="block mb-1">
            Enter the name of the folder
          </label>
          <input
            type="text"
            id="name"
            className="border border-black p-1 rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Add <FaRegPlusSquare className="ml-1" />
          </button>
        </div>
      )}
    </>
  );
}

export default AddFolder;
