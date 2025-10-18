import { useState } from "react";
import { useSchedule } from "../context/ScheduleContext";
import { registerAttendee } from "../api";

const ROLES = ["Student", "Junior", "Mid", "Senior"];

export default function Register() {
  const { sessionIds } = useSchedule();
  const selectedCount = sessionIds.length;

  // Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // UI states
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  // Validation
  const validate = () => {
    const es = []; // errors
    if (!name.trim()) es.push("Name is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) es.push("Email must be valid"); // no blanks, simple email regex
    if (!role) es.push("Role is required");
    setError(es);
    return es.length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setRegistrationId(null); // reset previous registration ID
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { name: name.trim(), email: email.trim(), role };
      const res = await registerAttendee(payload);
      if (res.ok) {
        setRegistrationId(res.registrationId);
        setError([]);
      } else {
        setError([res.error || "Registration failed"]);
      }
    } catch (error) {
      setError([error.message || "Registration failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="mx-5 container-lg py-6">
      <div className="bg-white border rounded-2xl border-gray-300 shadow-sm p-4">
        <h2 className="text-lg font-semibold">Register</h2>
        <p className="text-sm text-slate-600">
          Selected sessions: <span className="font-medium">{selectedCount}</span>
        </p>

        <form onSubmit={onSubmit} className="mt-4 grid gap-4 max-w-md">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              className="focus-ring w-full rounded-xl border border-gray-300 px-3 py-2"
              value={name}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              className="focus-ring w-full rounded-xl border border-gray-300 px-3 py-2"
              value={email}
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-slate-700"
            >
              Role
            </label>
            <select
              id="role"
              className="focus-ring w-full rounded-xl border border-gray-300 px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select...</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Errors */}
          {error.length > 0 && (
            <ul
              className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              aria-live="assertive"
            >
              {error.map((err, i) => (
                <li key={i}>- {err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-black disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Registration"}
          </button>
        </form>

        {/* Success Message */}
        {registrationId && (
          <p
            className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 mt-4"
            aria-live="polite"
          >
            Registration successful. Your registration ID is <b>{registrationId}</b>
          </p>
        )}
      </div>
    </section>
  );
}
