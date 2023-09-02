import { useEffect, useState } from "react";

import type { Ploc } from "@/core/common/presentation";

export function usePlocState<S>(ploc: Ploc<S>) {
  const [state, setState] = useState(ploc.currentState);

  useEffect(() => {
    const stateSubscription = (state: S) => {
      setState(state);
    };

    ploc.subscribe(stateSubscription);

    return () => ploc.unsubscribe(stateSubscription);
  }, [ploc]);

  return state;
}
