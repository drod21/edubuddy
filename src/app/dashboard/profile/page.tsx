import { auth } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";
import supabase from "~/utils/supabase";
import ProfileForm from "./ProfileForm";

export const revalidate = 0;

export default async function ProfilePage() {
  const user = auth().user;
  const token = (await auth().getToken({ template: "supabase" })) ?? "";
  await supabase.auth.setSession({ access_token: token, refresh_token: "" });
  const userMetadata = await supabase
    .from("user")
    .select()
    .eq("user_id", auth().userId)
    .single();

  if (!userMetadata && user) {
    await supabase.from("user").insert({
      id: user.id,
      email:
        user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
          ?.emailAddress ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    });
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileForm userProfile={userMetadata} />
    </Suspense>
  );
}
