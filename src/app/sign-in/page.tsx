import { SignIn, auth } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  const { userId } = auth();
  if (userId) return null;

  // div to center the sign in form with tailwind

  return (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}
