import type {
  Category,
  Subject,
  User as UserMetadata,
} from "~/types/database.types";
import Learn from "./learn";
import { createSupabaseClient } from "~/utils/supabase";
import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";
import LoadingSpinner from "~/app/(components)/LoadingSpinner";
import { Suspense } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { fetchData } from "~/app/api/learn/route";

type Categories = Array<Category>;
type Subjects = Array<
  Subject & {
    category: { name: string };
  }
>;
type User =
  | (UserMetadata & {
      education: { description: string | null };
    })
  | null;

export const revalidate = 0;
const fetchLearnData = async (
  category: string,
  subject: string,
  activity: string,
  userProfile: User
): Promise<string[]> => {
  try {
    const data = await fetchData(
      activity,
      userProfile?.education?.description ?? "",
      category,
      subject,
      userProfile?.dateOfBirth ?? ""
    );

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export default async function LearnPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = await createSupabaseClient();
  let data: string[] = [];
  const activities = await supabase.from("activities").select("contentType");
  const categories: { data: Categories | null } = await supabase
    .from("categories")
    .select("*");
  const subjects: { data: Subjects | null } = await supabase
    .from("subjects")
    .select(`id, name, category: categories(name)`);
  const user = await currentUser();
  const externalId = user && user.externalId;
  if (!externalId) {
    return;
  }
  const userProfile: PostgrestSingleResponse<User> = await supabase
    .from("user")
    .select("dateOfBirth, education: education( description )")
    .eq("id", externalId)
    .single();

  const subject = searchParams.subject;
  const category = searchParams.category;
  const contentType = searchParams.activity;

  if (subject && category && contentType && userProfile?.data) {
    data = await fetchLearnData(
      category,
      subject,
      contentType,
      userProfile.data
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Learn
        data={data}
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
