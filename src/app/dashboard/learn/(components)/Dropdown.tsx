import { useId } from "react";

type Props = {
  placeholder: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};
export default function Dropdown(props: Props) {
  const id = useId();

  return (
    <div>
      <label htmlFor={props.name} className="mb-1 block">
        {props.label}:{" "}
      </label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded bg-white p-2 text-primary"
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option, index) => (
          <option key={`${id}-${index}`} value={option ?? ""}>
            {option ?? ""}
          </option>
        ))}
      </select>
    </div>
  );
}
