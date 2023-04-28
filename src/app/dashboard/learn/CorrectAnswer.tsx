"use client";
import React from "react";
import { useStateMachine } from "~/hooks/state-machine/useStateMachine";

export type CorrectAnswer = {
  correctAnswer: string;
  grade: number;
};

const CorrectAnswerDisplay = () => {
  const { currentState, resource } = useStateMachine();
  if (currentState.name !== "success") return null;
  const data = resource.read() as CorrectAnswer;

  return (
    <div className="mt-4 rounded-lg bg-accent p-4">
      <div className="text-xl font-bold text-white">Correct Answer:</div>
      <div className="mt-2 text-white">{data.correctAnswer}</div>
      <div className="mt-4 text-xl font-bold text-white">Grade:</div>
      <div className="mt-2 text-white">{data.grade}%</div>
    </div>
  );
};

export default CorrectAnswerDisplay;
