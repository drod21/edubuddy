"use client";
import React from "react";
import LoadingSpinner from "~/app/(components)/LoadingSpinner";
import { useStateMachine } from "~/hooks/state-machine/useStateMachine";

export type CorrectAnswer = {
  correctAnswer: string;
  grade: number;
  notes: string;
};

const CorrectAnswerDisplay = () => {
  const { currentState, resource } = useStateMachine();
  if (currentState.name === "loading") return <LoadingSpinner />;
  if (currentState.name !== "success") return null;
  const data = resource.read() as CorrectAnswer;

  return (
    <div className="mt-4 rounded-lg bg-accent p-4">
      <div className="text-xl font-bold text-white">Correct Answer:</div>
      <div className="mt-2 text-white">{data.correctAnswer}</div>
      <div className="mt-4 text-xl font-bold text-white">Grade:</div>
      <div className="mt-2 text-white">{data.grade}%</div>
      {data.notes.length > 0 && (
        <>
          <div className="mt-4 text-xl font-bold text-white">Notes:</div>
          <div className="mt-2 text-white">{data.notes}</div>
        </>
      )}
    </div>
  );
};

export default CorrectAnswerDisplay;
