import "./App.css";
import Stock from "./components/Stock";
import "./modalStyle.css";
import { BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: "url(./circle.jpg)" }}>
        <Stock itemsPerPage={10} />
        <Routes></Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
