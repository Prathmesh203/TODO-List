import { createContext,useContext, useState } from "react";
export const globalContext = createContext(null);
function GlobalContextProvider({children}){
     const [Todos, setTodos] = useState([])
     const [folderPopup, setFolderPopup] = useState(false)
     const [folderId, setFolderId] = useState('')
     return(
          <globalContext.Provider value={{Todos,setTodos,folderPopup,setFolderPopup,folderId,setFolderId}}>
               {children}
          </globalContext.Provider>
     )
}
export default GlobalContextProvider
export function UseGlobalContext(){
     const context = useContext(globalContext);
     return context;
}