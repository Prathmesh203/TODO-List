import React, { useState } from "react";
import { UseGlobalContext } from "../context/context";
import { updateTodo, deleteTodo, createTodo } from "../Services/todoService";
import CreateTodo from "../features/CreateTodo";
import { MdDeleteOutline } from "react-icons/md";


function Todos() {
  const context = UseGlobalContext();
  const { setTodos, folderId, Todos } = context;
  const [newTodo, setNewtodo] = useState("");

  async function handleChecked(newTodo, todoId, checked) {
    const updatedTodo = {
      description: newTodo,
      status: checked ? "completed" : "pending",
    };
    try {
      await updateTodo(todoId, updatedTodo);
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, status: updatedTodo.status } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(todoId) {
    try {
      await deleteTodo(todoId);
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddTodo() {
    const todo = { description: newTodo };
    try {
      const data = await createTodo(folderId, todo);
      setNewtodo("");
      setTodos((prev) => (prev.length == 0 ? [data] : [...prev, data]));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className="bg-[#a48ffb] w-full rounded-lg m-3 flex flex-col items-center justify-around z-10">
      {Todos.length > 0 ? (
        <div className="w-full rounded-lg m-3 flex flex-col items-center justify-around z-10">
          <CreateTodo/>
          <ul className="flex flex-col gap-3">
            {Todos.map((todo) => (
              <li
                key={todo._id}
                className="w-[43vw] h-[7vh] bg-white flex items-center justify-between p-2 pt-0 pb-0 rounded-lg text-[#717082]"
              >
                <h1>{todo.description}</h1>
                <div className="flex w-[15%] justify-around">
                  <button
                    className="border text-2xl hover:bg-slate-400 hover:text-white"
                    onClick={() => handleDelete(todo._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                  <input
                    checked={todo.status === "completed"}
                    type="checkbox"
                    id={todo._id}
                    className="scale-150"
                    onChange={(e) => handleChecked(todo.description, todo._id, e.target.checked)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
        { folderId ?
        ( <div>
         <h1 className="w-[43vw] h-[7vh] bg-white flex items-center justify-between p-2 pt-0 pb-0 rounded-lg text-[#717082]">
            You didn't add any todos here
          </h1>
          <CreateTodo />
         </div>):(
          <h1 className="w-[43vw] h-[7vh] bg-white flex items-center justify-between p-2 pt-0 pb-0 rounded-lg text-[#717082]">please select a folder first </h1>
         )}
        </>
      )}
    </div>
  );
}

export default Todos;
