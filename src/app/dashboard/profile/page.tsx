import { auth, clerkClient } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";
import supabase from "~/utils/supabase";
import ProfileForm from "./ProfileForm";

export const revalidate = 0;

export default async function ProfilePage() {
  const userId = auth().userId;
  if (!userId) {
    return null;
  }
  const education = await supabase.from("education").select("id, description");
  const user = await clerkClient.users.getUser(userId);
  const externalId = user && user.externalId;
  const token = (await auth().getToken({ template: "supabase" })) ?? "";
  await supabase.auth.setSession({ access_token: token, refresh_token: "" });
  let userMetadata;
  console.log(externalId, user);
  if (!externalId && user) {
    userMetadata = await supabase
      .from("user")
      .insert({
        email:
          user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
            ?.emailAddress ?? "",
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .select("*")
      .single();
    await clerkClient.users.updateUser(user.id, {
      externalId: userMetadata?.data?.id ?? "",
    });
  } else {
    userMetadata = await supabase.from("user").select("*").single();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileForm education={education.data} userProfile={userMetadata.data} />
    </Suspense>
  );
}
