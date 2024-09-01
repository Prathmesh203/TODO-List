import { useEffect, useState } from "react";

import Folders from "./components/folders";
import Todos from "./components/todos";
function App() {
  return (
    <div className="flex w-full justify-center items-center h-[100vh] ">
      <div className="flex  w-[80%] h-[80%] border rounded-xl bg-[#a18aff] ">
        <Folders/>
        <Todos/>
      </div>
    </div>
  );
}

export default App;
