import UserAnswer from "./(components)/UserAnswer";
import { StateMachineProvider } from "~/hooks/state-machine/useStateMachine";
import type { CorrectAnswer } from "./CorrectAnswer";
type Props = {
  data: string[];
};

const stateMachineConfig = {
  initialState: { name: "idle" },
  transitions: [
    { from: "idle", to: "fetching" },
    { from: "fetching", to: "success" },
    { from: "fetching", to: "error" },
    { from: "error", to: "fetching" },
  ],
};

export default function Content(props: Props) {
  if (!props.data.length) {
    return null;
  }

  return (
    <div className="mt-8 rounded-lg bg-secondary p-4 text-white md:p-8">
      <h2 className="mb-4 text-xl font-bold">Activity:</h2>
      <StateMachineProvider<CorrectAnswer> config={stateMachineConfig}>
        {props.data?.map((item, index) => (
          <UserAnswer key={index} question={item} />
        ))}
      </StateMachineProvider>
    </div>
  );
}
