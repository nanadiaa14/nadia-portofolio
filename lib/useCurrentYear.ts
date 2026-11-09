import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// The visitor's current year. The page is pre-built once, so the year is read in the
// browser (not at build time) — it stays right for years without a rebuild.
// Returns null during the server render, then the real year right after.
export function useCurrentYear() {
  return useSyncExternalStore(
    noSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}