# 🎯 Frontend Technical Test — Session Finder + Schedule

This project was developed as part of a Frontend technical assessment.  
The goal was to build a small React app where users can:

1. Search and filter event sessions.
2. Add and remove sessions from a shared personal schedule.
3. Register using a form with validation and API integration.

---

## 🚀 Tech Stack

- **React (Vite)**
- **TailwindCSS** for styling
- **Context API** for shared state management
- **Mock API** for data fetching and registration simulation

---

## ▶️ How to Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
````

---

## 🧩 Implementation Overview

Search Page
  - Allows users to search sessions by title, track, or speaker.
  - Each result displays the session info and an Add to Schedule / Remove button.
  - Duplicate sessions are prevented.

My Schedule Page
  - Displays sessions added by the user, with the ability to remove them.
  - Sessions can also be sorted by start time.

Register Page
  - Contains a form with validation (name, email, role).
  - On submit, it calls the mock API (registerAttendee) and displays a confirmation message.
  - Also shows how many sessions the user has currently scheduled.

Shared State
  - Implemented via ScheduleContext, making sessions available across all pages.

Navigation Header
  - Provides quick access between sections and dynamically shows the number of sessions.


## 🛠 TODO / Improvements

Refactor session cards into reusable components.
  - The “Session” and “Scheduled Session” layouts share similar structure.
  - Plan: build a unified <SessionCard /> component that handles both states (add/remove, style, etc.).

Improve form UX.
  - Add inline validation errors and success messages for better clarity.

Persist schedule data.
  - Save the schedule in localStorage so it remains after page reloads.

Add animations and transitions.
  - Smooth fade or scale effects when adding/removing sessions for a polished UI.

Accessibility.
  - Improve keyboard navigation, focus styles, and ARIA attributes.

Responsive polish.
  - Adjust spacing and typography for smaller viewports.

---

## 🧑‍💻 Author

- Lluís Martínez
- Frontend & Full Stack Developer
- GitHub: github.com/lluismn


