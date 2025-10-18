import { useMemo, useState } from "react";
import { useSchedule } from "../context/ScheduleContext";
import { SESSIONS } from "../api";
import { formatDate } from "../utils/format";

export default function MySchedule() {
  const { sessionIds, remove } = useSchedule();
  const [asc, setAsc] = useState(true);

  const items = useMemo(() => {
    const selected = SESSIONS.filter((s) => sessionIds.includes(s.id));
    return selected.sort((a, b) => {
      const ta = new Date(a.startsAt).getTime();
      const tb = new Date(b.startsAt).getTime();
      return asc ? ta - tb : tb - ta;
    });
  }, [sessionIds, asc]);

  const count = items.length;

  return (
    <div className="bg-white border rounded-2xl border-gray-300 shadow-sm p-4 flex flex-col gap-4">
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold">My Schedule</h2>
        <p className="mt-1 text-sm text-slate-600" aria-live="polite">
          You have {count} session{count === 1 ? "" : "s"} scheduled.
        </p>

        {count > 1 && (
          <button
            onClick={() => setAsc((v) => !v)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            {asc ? "Sort Descending" : "Sort Ascending"}
          </button>
        )}
      </div>

      {count === 0 && (
        <div className="mt-4 grid sm:grid-cols-2">
          <p className="text-slate-600">
            No sessions yet. Go to <span className="font-medium">Search</span>{" "}
            to add some.
          </p>
        </div>
      )}

      {count > 0 && (
        <ul className="grid sm:grid-cols-2 gap-4">
          {items.map((s) => (
            // 👆 retorno implícito con paréntesis
            <li
              key={s.id}
              className="flex flex-col items-start justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="mb-2 flex w-full flex-col gap-2">
                <div className="mb-1 sm:mb-0 flex justify-between w-full sm:w-auto">
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    {s.track}
                  </p>
                </div>

                <p className="text-sm text-gray-500">Speaker: {s.speaker}</p>
                <p className="text-sm text-gray-500">
                  Starts: {formatDate(s.startsAt)} · {s.durationMins} mins
                </p>
              </div>

              <div className="mt-2">
                <button
                  onClick={() => remove(s.id)}
                  className="mt-2 px-3 py-1.5 rounded-md text-sm font-medium bg-rose-600 text-white hover:bg-rose-700"
                >
                  Remove from Schedule
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
