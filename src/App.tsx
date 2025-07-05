import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const handleSelect = (pg: string) => {
    setPage(pg);
  };

  return (
    <>
      <div
        id="appRoot"
        className="align-content-start container-fluid row ht-fill"
      >
        <div className="col-2 ht-fill" id="sideNav">
          <Navbar currentPG={page} onChange={handleSelect} />
        </div>
        <div className="col-6" id="centerContent">
          <Title />
        </div>
        <div className="col-3" id="sideUtils"></div>
      </div>
    </>
  );
}

export default App;
