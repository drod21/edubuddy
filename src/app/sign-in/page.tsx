import { SignIn, auth } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  const { userId } = auth();
  if (userId) return null;

  return <SignIn />;
}
