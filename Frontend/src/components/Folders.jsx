import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { getFolder,deleteFolder } from "../Services/folderServices";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { UseGlobalContext } from "../context/context";
import { getTodos } from "../Services/todoService";
import AddFolder from "../features/AddFolder";
function Folders() {
  const context = UseGlobalContext();
  const [filters, setFilters] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const setPopup = context.setFolderPopup;
  function addPopup() {
    setPopup(true);
  }
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedFilters = await getFolder();
        setFilters(fetchedFilters);
        console.log(fetchedFilters);
        
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setisLoading(false);
      }
    };
    fetchFilters();
  }, []);
  const handleTodos = async (folderId) => {
    const data = await getTodos(folderId);
    context.setTodos(data);
    context.setFolderId(folderId)
  };
  async function handleDelete(folderId) {
      try {
         const data = await deleteFolder(folderId)
         console.log(data);
         setFilters((prev) => prev.filter((item) => item._id !== folderId));

      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className=" w-[40%] rounded-l-lg  text-[#717082] flex flex-col items-center justify-center border bg-white m-3 gap-1">
      <AddFolder setFilters={setFilters} />
      <div className="flex flex-col justify-between overflow-y-scroll w-full ml-2 mr-2 h-[250px]">
        <h1 className="text-lg flex gap-5 sticky">
          <SlCalender color="#ca8bfe" fontSize={20} />
          Todays task
        </h1>
        {isLoading ? (
          <h1>Loading.....</h1>
        ) : (  
          <div>
            {
            (Array.isArray(filters)) ? (<ul>
              {filters.map((f) => (
                <li
                  key={f._id}
                  className="font-bold flex items-center text-center justify-between gap-5"
                >
                  <button onClick={() => handleTodos(f._id)} className="mt-2">
                    {f.name}
                  </button>
                  <button
                    className="border hover:bg-slate-400 hover:text-white"
                    onClick={()=>handleDelete(f._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </li>
              ))}
            </ul>):(
              <h1>please add folder </h1>
            )
            }
          </div>
        )}
        <button
          className="flex gap-2 mt-5 items-center border rounded-lg hover:bg-[#ca8dfe] hover:text-white p-1 font-semibold "
          onClick={addPopup}
        >
          <FaCirclePlus />
          <h1>Add Folder</h1>
        </button>
      </div>
    </div>
  );
}
export default Folders;
