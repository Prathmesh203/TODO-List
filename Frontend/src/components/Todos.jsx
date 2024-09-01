import React, { useEffect, useState } from "react";
import { UseGlobalContext } from "../context/context";
import { updateTodo } from "../Services/todoService";
function Todos() {
  const context = UseGlobalContext();
  const todos = context.Todos;
  console.log(todos);
  

  async function handleChecked(newTodo, todoId,checked) {
    const updatedTodo = {
      description: newTodo,
      status : checked ? 'completed': 'pending'
    }
    try {
      await updateTodo(todoId, updatedTodo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#a48ffb] w-full rounded-lg m-3 flex items-center justify-center z-10 ">
      {todos.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="w-[43vw] h-[7vh] bg-white flex items-center justify-between p-2 pt-0 pb-0 rounded-lg text-[#717082] "
            >
              <h1>{todo.description}</h1>{" "}
              <input
                type="checkbox"
                id={todo._id}
                className="h-full text-[#a18aff]"
                onChange={(e) => {
                  handleChecked(todo.description, todo._id,e.target.checked);
                 
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="w-[43vw] h-[7vh] bg-white flex items-center justify-between p-2 pt-0 pb-0 rounded-lg text-[#717082] ">
          there is no items
        </h1>
      )}
    </div>
  );
}

export default Todos;
