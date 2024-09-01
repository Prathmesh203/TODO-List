import { createContext,useContext, useState } from "react";
export const globalContext = createContext(null);
function GlobalContextProvider({children}){
     const [Todos, setTodos] = useState([])
     return(
          <globalContext.Provider value={{Todos,setTodos}}>
               {children}
          </globalContext.Provider>
     )
}
export default GlobalContextProvider
export function UseGlobalContext(){
     const context = useContext(globalContext);
     return context;
}