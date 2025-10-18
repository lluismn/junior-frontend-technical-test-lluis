// Returns date with letters
export function formatDate(startsIso, locale = "es-ES") {
  const dt = new Date(startsIso);

  const day = dt.getDate();
  const month = dt
    .toLocaleString(locale, { month: "short" })
    .replace(".", "")
    .toLowerCase(); // remove dot and lowercase
  const year = dt.getFullYear();

  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hh}:${mm}`;
}
