import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Title from "./components/Title";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div id="app-root" className="flex-fill align-content-start">
        <Title />
        <Navbar />
      </div>
    </>
  );
}

export default App;
