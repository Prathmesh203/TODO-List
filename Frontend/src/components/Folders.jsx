import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { getFolder } from "../Services/folderServices";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { UseGlobalContext } from "../context/context";
import { getTodos } from "../Services/todoService";
function Folders() {
  const context = UseGlobalContext();

  const [filters, setFilters] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
     const fetchFilters = async () => {
       try {
         const fetchedFilters = await getFolder();
         setFilters(fetchedFilters);
       } catch (error) {
         console.error('Error fetching filters:', error);
       } finally {
         setisLoading(false);
       }
     };
   
     fetchFilters();
   }, []);
  const handleTodos = async (folderId) => {
    const data = await getTodos(folderId);
    context.setTodos(data);
  };

  return (
    <div className=" w-[30%] rounded-l-lg  text-[#717082] flex flex-col items-center justify-center border bg-white m-3">
      <div className="flex flex-col">
        <h1 className="text-lg flex gap-5">
          <SlCalender color="#ca8bfe" fontSize={20} />
          Todays task
        </h1>
        {isLoading ? (
          <h1>Loading.....</h1>
        ) : (
          <ul>
            {filters.map((f) => (
              <li
                key={f._id}
                className="font-bold flex items-center text-center justify-between gap-5"
              >
                <button onClick={() => handleTodos(f._id)} className="mt-2">
                  {f.name}
                </button>
                <button className="border">
                  <MdDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="flex gap-2 mt-5 items-center border rounded-lg hover:bg-[#ca8dfe] hover:text-white p-1 font-semibold ">
          <FaCirclePlus />
          <h1>Add Folder</h1>
        </button>
      </div>
    </div>
  );
}

export default Folders;
