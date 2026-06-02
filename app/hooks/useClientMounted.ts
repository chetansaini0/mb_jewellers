"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True in the browser after hydration; false during SSR (avoids extension-injected attribute mismatches). */
export function useClientMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
