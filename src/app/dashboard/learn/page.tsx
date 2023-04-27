import { type Database } from "~/types/supabase";
import Learn from "./learn";
import { supabase } from "~/utils/supabase";
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Categories = Array<Category>;
type Subjects = Array<Database["public"]["Tables"]["subjects"]["Row"]>;

export const revalidate = 0;
export default async function LearnPage() {
  // TODO: Fetch categories, subjects, contentTypes
  const activities = await supabase.from("activities").select("contentType");
  console.log({ activities });
  const categories: { data: Categories | null } = await supabase
    .from("categories")
    .select("*");
  const subjects: { data: Subjects | null } = await supabase
    .from("subjects")
    .select(`*`);

  return (
    <Learn
      categories={categories?.data ?? []}
      subjects={subjects?.data ?? []}
      contentTypes={
        activities.data?.map(
          (x: { contentType: string | null }) => x?.contentType ?? ""
        ) ?? []
      }
    />
  );
}
