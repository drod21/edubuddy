"use client";
import type { FormEvent } from "react";
import type { Database } from "~/types/db";
import { supabase } from "~/utils/supabase";
type User = Database["public"]["Tables"]["user"]["Row"] | null;

const updateUser = async (
  data: Partial<Database["public"]["Tables"]["user"]["Row"]>
) => {
  const { error } = await supabase.from("user").update(data).eq("id", data.id);
  if (error) {
    console.log(error);
  }
};
export default function ProfileForm({
  education,
  userProfile,
}: {
  education:
    | Pick<
        Database["public"]["Tables"]["education"]["Row"],
        "id" | "description"
      >[]
    | null;
  userProfile: User;
}) {
  console.log(userProfile);
  if (!userProfile) {
    return null;
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(e, data);
    await updateUser({
      id: userProfile.id,
      educationLevel: data?.educationLevel?.toString() ?? "",
      dateOfBirth: data?.dateOfBirth?.toString() ?? "",
    });
  };

  const formatBirthdate = (birthdate?: string): string | undefined => {
    if (!birthdate) {
      return;
    }
    const date = new Date(birthdate);
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
          defaultValue={formatBirthdate("")}
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="educationLevel"
          className="block text-sm font-medium text-gray-700"
        >
          Education Level
        </label>
        <select
          className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
          name="educationLevel"
          id="educationLevel"
          defaultValue={""}
        >
          <option value="">Select your education level</option>
          {education?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.description}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="focus:ring-primary w-full rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  );
}
