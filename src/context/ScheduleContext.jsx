import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const [sessionIds, setSessionIds] = useState([]);
  const add = (id) =>
    setSessionIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const remove = (id) => setSessionIds((prev) => prev.filter((x) => x !== id));
  return (
    <ScheduleContext.Provider value={{ sessionIds, add, remove }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) {
    throw new Error("useSchedule must be used within <ScheduleProvider>");
  }
  return ctx;
}
