"use client";
import { useUser } from "@clerk/nextjs";
import type { FormEvent } from "react";
import { api } from "~/utils/api";

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) {
    return <div>Not authorized</div>;
  }
  const mut = api.user.setUserProfile.useMutation();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(e, data);
    mut.mutate({
      externalId: user.externalId ?? "",
      userId: user.id ?? "",
      educationLevel: (data.educationLevel as string) ?? "",
      dateOfBirth: new Date((data.dateOfBirth as string) ?? ""),
    });
  };

  const userProfile = api.user.getUserProfile.useQuery({
    userId: user.externalId ?? "",
  });
  if (!userProfile || !userProfile.data) {
    return <div>Loading</div>;
  }

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
          defaultValue={formatBirthdate(
            userProfile.data.dateOfBirth?.toString() ?? ""
          )}
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
          defaultValue={userProfile.data.educationLevel ?? ""}
        >
          <option value="">Select your education level</option>
          <option value="Preschool">Preschool</option>
          <option value="Kindergarten">Kindergarten</option>
          <option value="Elementary">Elementary School</option>
          <option value="Middle School">Middle School</option>
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
