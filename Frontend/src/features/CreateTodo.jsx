import React, { useState } from "react";
import { UseGlobalContext } from "../context/context";
import { FaCirclePlus } from "react-icons/fa6";
import { createTodo } from "../Services/todoService";

function CreateTodo() {
  const context = UseGlobalContext();
  const { folderId, setTodos } = context;
  const [newTodo, setNewtodo] = useState("");
     
  async function handleAddTodo() {
   
    if (!newTodo.trim()) {
      alert("Please enter a todo description");
      return;
    }

    const todo = {
      description: newTodo,
    };

    try {
      const data = await createTodo(folderId, todo);
      setNewtodo("");
      setTodos((prev) => {
        const currentTodos = Array.isArray(prev) ? prev : [];
        return currentTodos.length === 0 ? [data] : [...currentTodos, data];
    });
      
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="w-[43vw] h-[7vh] bg-white top-[11%] p-2 pt-0 pb-0 rounded-lg text-[#717082] absolute flex justify-between">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewtodo(e.target.value)}
        className="w-[80%] border rounded-xl"
        placeholder="Write Your Todo Here"
      />
      <button
        className="flex gap-2 items-center border rounded-lg hover:bg-[#ca8dfe] hover:text-white p-1 font-semibold"
        onClick={handleAddTodo}
      >
        <FaCirclePlus />
        <h1>Add todo</h1>
      </button>
    </div>
  );
}

export default CreateTodo;
