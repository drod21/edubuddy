// StateMachine.ts

import type { ReactNode } from "react";
import { Resource } from "./Resource";

// A simple type for state names.
export type StateName = string;

// State object type, which holds the data and its type.
export interface StateData<T = any> {
  data?: T;
}

// State type, which holds the name and the state object.
export interface State<T = any> {
  name: StateName;
  stateData?: StateData<T>;
}

// Transition type, which holds the current state, the target state, and any optional data.
export interface Transition<T = any> {
  from: StateName;
  to: StateName;
  data?: T;
}

// StateMachineConfig type, which holds the initial state and the state transition table.
export interface StateMachineConfig<T = any> {
  initialState: State<T>;
  transitions: Array<Transition<T>>;
}

// StateMachineContext type, which holds the current state, transition function, and any optional data.
export interface StateMachineContext<T = any> {
  currentState: State<T>;
  resource: Resource<T>;
  transitionTo: (stateName: StateName, data?: T) => void;
}

// StateMachineProviderProps type, which holds the state machine config and children elements.
export interface StateMachineProviderProps<T = any> {
  config: StateMachineConfig<T>;
  children: ReactNode;
}

// useStateMachine type, a custom hook that returns the current state and transition function.
export type UseStateMachine<T = any> = () => StateMachineContext<T>;
