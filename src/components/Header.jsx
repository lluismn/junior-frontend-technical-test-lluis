import { useSchedule } from "../context/ScheduleContext";

export default function Header({ view, setView}) {

    const { sessionIds } = useSchedule();
      const selectedCount = sessionIds.length;

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto container-lg px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
            SF
          </div>
          <h1 className="text-xl font-semibold">Session Finder</h1>
        </div>
        <nav className="flex items-center gap-2">
            {["search", "mySchedule", "register"].map((key) => (
                <button
                key={key}
                onClick={() => setView(key)}
                    className={`focus-ring px-3 py-2 rounded-lg text-sm font-medium ${
                        view === key
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    
                >
                    {key === "search" && "Search"}
                    {key === "mySchedule" && `My Schedule (${selectedCount})`}
                    {key === "register" && "Register"}
                </button>

            ))}
        </nav>
      </div>
    </header>
  );
}
