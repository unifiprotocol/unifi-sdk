import { useReducer } from "react";
import { ShellContext } from "./ShellContext";
import { ShellReducer } from "./ShellReducer";
import { getShellInitialState } from "./ShellState";

export const ShellProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ShellReducer, getShellInitialState());

  return (
    <ShellContext.Provider value={{ state, dispatch }}>
      {children}
    </ShellContext.Provider>
  );
};
