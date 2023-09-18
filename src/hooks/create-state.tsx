import { useSyncExternalStore } from "react";

export function createState<S>() {
  let currentState: S;
  const listeners = new Set<(state: S) => void>();
  const isInitialized = false;

  return {
    init: (initialState: S) => {
      if (!isInitialized) {
        currentState = initialState;
      }
    },
    setState(callback: (state: S) => S) {
      currentState = callback(currentState);
      listeners.forEach((listener) => listener(currentState));
    },
    useSelector(selector: (state: S) => S) {
      return useSyncExternalStore(
        (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        () => selector(currentState),
        () => selector(currentState)
      );
    },
  };
}
