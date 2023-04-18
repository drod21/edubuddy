import { SignUp, auth } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  const { userId } = auth();
  if (userId) return null;

  return <SignUp />;
}
