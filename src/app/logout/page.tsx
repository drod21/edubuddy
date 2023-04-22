import { clerkClient, auth } from "@clerk/nextjs/app-beta";
export default async function LogoutPage() {
  const sessionId = auth().sessionId;
  if (!sessionId) {
    return null;
  }
  await clerkClient.sessions.revokeSession(sessionId);
  return null;
}
