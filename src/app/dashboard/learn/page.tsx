import { type Database } from "~/types/supabase";
import Learn from "./learn";
import { supabase } from "~/utils/supabase";
import { auth, clerkClient } from "@clerk/nextjs/app-beta";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";
import LoadingSpinner from "~/app/(components)/LoadingSpinner";
import { Suspense } from "react";
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Categories = Array<Category>;
type Subjects = Array<
  Database["public"]["Tables"]["subjects"]["Row"] & {
    category: { name: string };
  }
>;
type User =
  | (Database["public"]["Tables"]["user"]["Row"] & {
      education: { description: string | null };
    })
  | null;

export const revalidate = 0;
export default async function LearnPage() {
  // TODO: Fetch categories, subjects, contentTypes
  const activities = await supabase.from("activities").select("contentType");
  const categories: { data: Categories | null } = await supabase
    .from("categories")
    .select("*");
  const subjects: { data: Subjects | null } = await supabase
    .from("subjects")
    .select(`id, name, category: categories(name)`);
  const userId = auth().userId;
  const user = await clerkClient.users.getUser(userId ?? "");
  const externalId = user && user.externalId;
  if (!externalId) {
    return;
  }
  const userProfile: PostgrestSingleResponse<User> = await supabase
    .from("user")
    .select("dateOfBirth, education: education( description )")
    .eq("id", externalId)
    .single();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Learn
        userProfile={userProfile?.data ?? null}
        categories={categories?.data ?? []}
        subjects={subjects?.data ?? []}
        contentTypes={
          activities.data?.map(
            (x: { contentType: string | null }) => x?.contentType ?? ""
          ) ?? []
        }
      />
    </Suspense>
  );
}
