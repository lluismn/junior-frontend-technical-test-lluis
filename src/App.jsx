import { useState } from "react";
import Header from "./components/Header";
import MySchedule from "./components/MySchedule";
import Register from "./components/Register";
import Search from "./components/Search";
import "./index.css";

function App() {

  const [view, setView] = useState("search");
  return (
    <>
      <main  className="min-h-screen mx-auto container-lg px-4 py-2 gap-6 flex flex-col ">
        <Header view={view} setView={setView} />
        {view === "search" && <Search />}
        {view === "mySchedule" && <MySchedule />}
        {view === "register" && <Register />}

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <small>©2025 Session Finder. Technical Test made by Lluís Martínez N.</small>
        </footer>
      </main>

    </>
  );
}

export default App;
