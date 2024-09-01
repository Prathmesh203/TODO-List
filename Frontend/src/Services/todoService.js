const url = "https://todo-app-backend-latest.onrender.com";

export const getTodos = async (folderID) => {
  try {
    const request = await fetch(`${url}/todos/${folderID}`);
    if (!request.ok) throw Error("data not found");
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createTodo = async (folderID, todo) => {
  try {
    const response = await fetch(`${url}/todos/${folderID}`, {
      method: "POST",
      headers: {
        "content-type": "application.json",
      },
      body: todo,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const updateTodo = async (todoId, newTodo) => {
  try {
    const response = await fetch(`${url}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: newTodo,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTodo = async(todoId)=>{
     try {
          const response = await fetch(`${url}/todos/${todoId}`,{
               method:'DELETE',
               headers:{
                    'content-type':'application/json'
               },
          })
          const data = await response.json();
          return data;
     } catch (error) {
          console.log(error.message);
     }
}

