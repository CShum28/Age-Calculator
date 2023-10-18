import "./App.css";
import Age from "./components/Age";
import CalcAge from "./components/CalcAge";

function App() {
  return (
    <div className="flex flex-col ml-20 mt-10 border-2 w-fit pt-10 pb-20 pl-10 pr-40 rounded-3xl bg-white">
      <CalcAge />
      <Age />
    </div>
  );
}

export default App;
