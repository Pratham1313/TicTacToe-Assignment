import { useState } from "react";
import "./App.css";
import User_input from "./Components/user_input";
import TicTacToe from "./Components/TicTacToe";

import { Route, Routes } from "react-router-dom";

function App() {
  const [size, setsize] = useState(3);
  const [streak, setstreak] = useState(3);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <User_input
            f_size={size}
            f_setsize={setsize}
            f_streak={streak}
            f_setstreak={setstreak}
          />
        }
      ></Route>
      <Route
        path="/game"
        element={
          <TicTacToe
            f_size={size}
            f_setsize={setsize}
            f_streak={streak}
            f_setstreak={setstreak}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
