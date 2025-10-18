import { useEffect, useState } from "react";
import { useSchedule } from "../context/ScheduleContext";
import { searchSessions } from "../api";
import { formatDate } from "../utils/format";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { sessionIds, add, remove } = useSchedule();

  // Simulating an API call
  useEffect(() => {
    let active = true;
    setLoading(true);

    searchSessions(query).then((data) => {
      if (active) {
        setResults(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <section className="mx-5 container-lg px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2>Search</h2>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title, track,or speaker"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4">
            {results.map((s) => {
              const added = sessionIds.includes(s.id);
              return (
                <li
                  key={s.id}
                  className="flex flex-col items-start justify-between rounded-2xl border border-gray-200 p-3"
                >
                  <div className="mb-2 flex w-full flex-col gap-2">
                    <div className="mb-1 sm:mb-0 flex justify-between w-full sm:w-auto">
                      <p className="font-medium">{s.title}</p>
                      <p className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                        {s.track}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      Speaker: {s.speaker}
                    </p>
                    <p className="text-sm text-gray-500">
                      Starts: {formatDate(s.startsAt)} · {s.durationMins} mins
                    </p>
                  </div>
                  <div className="mt-2">
                    {added ? (
                      <button
                        onClick={() => remove(s.id)}
                        className="mt-2 px-3 py-1.5 rounded-md text-sm font-medium bg-rose-600 text-white hover:bg-rose-700"
                      >
                        Remove from Schedule
                      </button>
                    ) : (
                      <button
                        onClick={() => add(s.id)}
                        className="mt-2 px-3 py-1.5 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-black"
                      >
                        Add to Schedule
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
