import { useSyncExternalStore } from "react";

import { StatefulPloc } from "@/core/common/presentation";

export function createState<S>(initialState: S) {
  const ploc = new StatefulPloc<S>(initialState);

  return {
    setState(callback: (state: S) => S) {
      currentState = callback(currentState);
      listeners.forEach((listener) => listener(currentState));
    },
    useSelector<T>(selector: (state: S) => T) {
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
