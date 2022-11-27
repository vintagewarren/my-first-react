import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/movie/:id"} element={<Detail />} />
        <Route path={"/my-first-react/"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

// package.json 중 script 내에 추가해줄 것 :    "deploy": "gh-pages -d build",  "predeploy" : "npm run build"
// package.json 마지막 두번째 }뒤에 추가해줄 것 : , "homepage":"https://aretas.github.io/react_practice1"
