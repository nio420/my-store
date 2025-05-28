import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreCreation from "./pages/StoreCreation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreCreation />} />
      </Routes>
    </Router>
  );
}

export default App;


