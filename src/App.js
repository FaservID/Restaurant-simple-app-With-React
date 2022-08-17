import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import "./App.css";
import { NavbarComponent } from "./components";
import NotFound from "./errors/NotFound";
import { Home, Success } from "./pages/Index";
import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/success" exact element={<Success />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
