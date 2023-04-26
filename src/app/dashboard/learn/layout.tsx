import React, { type PropsWithChildren } from "react";

export default function LearnLayout(props: PropsWithChildren) {
  return (
    <div className="rounded-lg bg-primary p-8 text-white">
      <h1 className="mb-4 text-2xl font-bold">
        Select your learning preferences
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {props.children}
      </div>
    </div>
  );
}
