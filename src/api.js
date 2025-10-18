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
