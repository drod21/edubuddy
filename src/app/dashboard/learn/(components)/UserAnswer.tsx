"use client";
import { useEffect, useState } from "react";
import CorrectAnswerDisplay from "../CorrectAnswer";
import { useStateMachine } from "~/hooks/state-machine/useStateMachine";
type Answer = {
  correctAnswer: string;
  grade: number;
};
type Response = {
  json: () => Promise<Answer>;
};

async function submitAnswer(answer: string, question: string) {
  const data: Response = await fetch(`/api/learn`, {
    body: JSON.stringify({ answer, question }),
    method: "POST",
  });

  const json: Answer = await data.json();

  return json;
}

export default function UserAnswer(props: { question: string }) {
  const { currentState, resource, transitionTo } = useStateMachine();
  const [userAnswer, setUserAnswer] = useState<string>(() => "");
  const [gradedAnswer, setGradedAnswer] = useState<Answer>(
    () => ({} as Answer)
  );

  useEffect(() => {
    if (currentState.name === "fetching") {
      resource.setPromise(
        submitAnswer(userAnswer, props.question)
          .then((res) => {
            resource.setData(res);
            transitionTo("success");
          })
          .catch((err) => {
            console.log(err);
            transitionTo("error");
          })
      );
    }
  }, [currentState.name, props.question, resource, transitionTo, userAnswer]);

  const handleSubmitAnswer = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userAnswer) {
      return;
    }
  };

  return (
    <div>
      <pre className="whitespace-pre-wrap">{props.question}</pre>
      <input
        type="text"
        className="w-full rounded p-2 text-gray-950 md:w-1/2"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button
        className="mt-2 rounded bg-primary px-4 py-2 text-white"
        onClick={() => transitionTo("fetching")}
      >
        Submit
      </button>
      <CorrectAnswerDisplay />
    </div>
  );
}