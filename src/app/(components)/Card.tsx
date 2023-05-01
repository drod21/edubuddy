import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-md md:p-6">
      <h3 className="mb-2 text-lg font-bold text-primary">{title}</h3>
      <p className="text-neutral">{content}</p>
    </div>
  );
};

export default Card;
