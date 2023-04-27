import React, { type PropsWithChildren } from "react";

export default function LearnLayout(props: PropsWithChildren) {
  return (
    <div className="flex-grow p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Select your learning preferences
      </h1>
      {props.children}
    </div>
  );
}
