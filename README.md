# 🎯 Frontend Take-Home Test — Session Finder + Schedule

## ⏱ Timebox
Please spend **no more than 2 hours** on this task.  
It’s okay to leave comments or TODOs for improvements if you run out of time.

---

## 📌 Goal
Build a small React app where a user can:

1. **Search sessions** (from a provided mock API).  
2. **Add/remove sessions** to a personal **Schedule** (shared state).  
3. **Register** with a simple **form + validation**, and show a confirmation from the API.  

You're completely free to use the style you prefer.
You can see an example on how it could looks on this link: https://68dcffe5683caab0190f57ff--guileless-truffle-7eae5c.netlify.app/

---

## 🛠 Tech Rules
- Use **React** (JavaScript).  
- Styling is up to you — **Tailwind is optional** (bonus points if used cleanly).  
- Don’t use heavy UI frameworks (Material UI, Ant Design, etc.).  
- Keep it functional and clear; design polish is optional.

---

## 🚀 Features

### 1) Search
- Input to filter sessions by **title, track, or speaker**.  
- Display results with **title, track, speaker, start time**.  
- Each result has an **“Add to Schedule”** button.  
- Prevent duplicates (disable button or show a notice).

### 2) My Schedule
- List sessions the user added.  
- Allow **Remove**.  
- (Bonus) Sort by start time.

### 3) Register
- Form fields: **name**, **email**, **role** (`Student | Junior | Mid | Senior`).  
- **Validation**:  
  - Name: required.  
  - Email: must look like a valid email.  
  - Role: required.  
- On submit → call `registerAttendee(payload)` and display the returned **registrationId**.

### 4) Shared State
- Use the provided **ScheduleContext** to make the schedule available across Search + My Schedule.  

---

## 📦 Mock API
Copy the following into `src/api.js`:

```js
export const SESSIONS = [
  { id: "s1", title: "React Rendering Deep Dive", track: "Frontend", speaker: "A. Lee", startsAt: "2025-10-01T10:00:00Z", durationMins: 45 },
  { id: "s2", title: "APIs without Tears", track: "Backend", speaker: "B. Singh", startsAt: "2025-10-01T11:00:00Z", durationMins: 30 },
  { id: "s3", title: "State Mgmt Tradeoffs", track: "Frontend", speaker: "C. Gomez", startsAt: "2025-10-01T12:00:00Z", durationMins: 30 },
  { id: "s4", title: "Practical CI/CD", track: "DevOps", speaker: "D. Chen", startsAt: "2025-10-01T13:00:00Z", durationMins: 40 },
  { id: "s5", title: "Small Models, Big Wins", track: "AI", speaker: "E. Rossi", startsAt: "2025-10-01T14:00:00Z", durationMins: 25 },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function searchSessions(query) {
  await delay(300);
  const q = (query || "").trim().toLowerCase();
  if (!q) return SESSIONS;
  return SESSIONS.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.track.toLowerCase().includes(q) ||
    s.speaker.toLowerCase().includes(q)
  );
}

export async function registerAttendee(payload) {
  await delay(400);
  if (!payload?.name || !payload?.email || !payload?.role) {
    return { ok: false, error: "Missing fields" };
  }
  return { ok: true, registrationId: "REG-" + Math.floor(100000 + Math.random() * 900000) };
}

```

---

## 📂 Provided Context
Copy into `src/context/ScheduleContext.jsx`:

```js
import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const [sessionIds, setSessionIds] = useState([]);
  const add = (id) => setSessionIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  const remove = (id) => setSessionIds(prev => prev.filter(x => x !== id));
  return (
    <ScheduleContext.Provider value={{ sessionIds, add, remove }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export const useSchedule = () => useContext(ScheduleContext);
```

Wrap your app with `<ScheduleProvider>` in main.jsx or App.jsx.

---

## ▶️ How to Run

```bash
npm install
npm run dev

```

---

## 📑 What to Submit

- A link to a public repo (GitHub/GitLab) with your code.

- A short README explaining:
    - How to run the project
    - What you’d improve with more time
    - Any libraries you used (and why)




---
TODO

  - Pass card to an independent component
