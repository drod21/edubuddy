// StateMachine.tsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useTransition,
} from "react";
import { StateMachineContext } from "./types";
import type {
  State,
  StateMachineProviderProps,
  StateName,
  Transition,
  UseStateMachine,
} from "./types";
import { Resource } from "./Resource";

// Define the state machine reducer
function stateMachineReducer<T>(
  state: State<T>,
  action: Transition<T>
): State<T> {
  const { from, to, data } = action;
  if (state.name === from) {
    return { name: to, stateData: { data } };
  }
  return state;
}

// Create the StateMachine context
const StateMachineContext = createContext<StateMachineContext | null>(null);

// StateMachineProvider component
export function StateMachineProvider<T extends Record<string, unknown>>({
  config,
  children,
}: StateMachineProviderProps<T>): JSX.Element {
  const [currentState, dispatch] = useReducer(
    stateMachineReducer,
    config.initialState
  );
  const resource = useMemo(() => new Resource<T>(), []);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (currentState.stateData) {
      resource.setData(currentState.stateData.data as T | undefined);
    }
  }, [currentState, resource]);

  const transitionTo = useCallback(
    (stateName: StateName, data?: T) => {
      const transition: Transition<T> | undefined = config.transitions.find(
        (t) => t.from === currentState.name && t.to === stateName
      );
      if (transition) {
        startTransition(() => {
          dispatch({ ...transition, data });
        });
      }
    },
    [config.transitions, currentState.name]
  );

  const value = useMemo(
    () => ({ currentState, resource, transitionTo }),
    [currentState, resource, transitionTo]
  );

  return (
    <StateMachineContext.Provider value={value}>
      {children}
    </StateMachineContext.Provider>
  );
}

// useStateMachine custom hook
export const useStateMachine: UseStateMachine = () => {
  const context = useContext(StateMachineContext);
  if (!context) {
    throw new Error(
      "useStateMachine must be used within a StateMachineProvider"
    );
  }
  return context;
};
