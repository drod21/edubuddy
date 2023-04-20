"use client";
import { useUser } from "@clerk/clerk-react";
import type { FormEvent } from "react";
import { api } from "~/utils/api";

export default function ProfileModalPage({}) {
  const { user } = useUser();
  if (!user) {
    return <div>Not authorized</div>;
  }
  const mut = api.user.setUserProfile.useMutation();
  const onSubmit = (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    mut.mutate({
      userId: user.id,
      educationLevel: (data.educationLevel as string) ?? "",
      dateOfBirth: new Date((data.dateOfBirth as string) ?? ""),
    });
  };

  const userProfile = api.user.getUserProfile.useQuery({
    userId: user?.id ?? "",
  });

  // const [age, setAge] = useState<number | undefined>();
  // const [educationLevel, setEducationLevel] = useState<string | undefined>();

  // const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAge(parseInt(e.target.value));
  // };

  // const handleEducationLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setEducationLevel(e.target.value);
  // };

  // function to derive age from dateOfBirth
  function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  if (userProfile.isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>
      <div className="w-full rounded-md bg-white p-6 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/3">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              defaultValue={getAge(
                userProfile.data?.dateOfBirth?.toString() ?? ""
              )}
              type="number"
              name="age"
              id="age"
              min="3"
              max="99"
              // value={age}
              // onChange={handleAgeChange}
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
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
              name="educationLevel"
              id="educationLevel"
              defaultValue={userProfile.data?.educationLevel ?? ""}
              // value={educationLevel || ''}
              // onChange={handleEducationLevelChange}
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
            >
              <option value="">Select your education level</option>
              <option value="preschool">Preschool</option>
              <option value="kindergarten">Kindergarten</option>
              <option value="elementary">Elementary School</option>
              <option value="middle">Middle School</option>
            </select>
          </div>
          <button
            type="submit"
            className="focus:ring-primary w-full rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
