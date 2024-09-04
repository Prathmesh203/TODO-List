import { useEffect, useState } from "react";

import Folders from "./components/Folders";
import Todos from "./components/Todos";
function App() {
  return (
    <div className="flex w-full justify-center items-center h-[100vh] ">
      <div className="flex  w-[90%] h-[80%] border rounded-xl bg-[#a18aff] ">
        <Folders/>
        <Todos/>
      </div>
    </div>
  );
}

export default App;
