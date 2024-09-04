const url = "https://todo-app-backend-latest.onrender.com";

export const getFolder = async () => {
  try {
    const response = await fetch(`${url}/folder`);
    const data = response.json();
    
    return data;
    
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (folderName) => {
  try {
    const response = await fetch(`${url}/folder`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folderName),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = async (folderId, folderName) => {
  try {
    const response = await fetch(`${url}/folder/${folderId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folderName),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const response = await fetch(`${url}/folder/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
