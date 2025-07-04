import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import IndexCards from "./components/IndexCards";

function App() {
  return (
    <>
      <div id="app-root" className="flex-fill align-content-start">
        <Title />
        <Navbar />
        <IndexCards title="Enter" />
        <IndexCards title="Explore" />
        <IndexCards title="Request" />
      </div>
    </>
  );
}

export default App;
