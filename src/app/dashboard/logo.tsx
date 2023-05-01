export default function Logo({
  height = 100,
  width = 100,
  size = 20,
}: {
  height: number;
  width: number;
  size: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#007BFF"
        strokeWidth="8"
        fill="none"
      />
      <path d="M50 30 L66.68 61.80 L32.36 61.80 Z" fill="#007BFF" />
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fontSize={size}
        fontFamily="Arial, sans-serif"
        fill="#007BFF"
      >
        EduBuddy
      </text>
    </svg>
  );
}
