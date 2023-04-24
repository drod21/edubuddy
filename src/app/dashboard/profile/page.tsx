import { auth } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";
import supabase from "~/utils/supabase";
import ProfileForm from "./ProfileForm";

export const revalidate = 0;

export default async function ProfilePage() {
  const token = (await auth().getToken({ template: "supabase" })) ?? "";
  await supabase.auth.setSession({ access_token: token, refresh_token: "" });
  const userMetadata = await supabase
    .from("user_metadata")
    .select()
    .eq("user_id", auth().userId)
    .single();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileForm userProfile={userMetadata} />
    </Suspense>
  );
}
