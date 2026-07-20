"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

// Subscribe to the passing minute as an external source. useSyncExternalStore
// keeps the SSR placeholder and swaps to live time after hydration without a
// mismatch warning.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// Shuvo's local time in Dhaka — ticks live so the footer feels alive and
// reinforces "reach me across timezones".
export function FooterClock() {
  const time = useSyncExternalStore(
    subscribe,
    format,
    () => "··:··", // server snapshot — stable placeholder
  );

  return <span className="tabular-nums">{time}</span>;
}
