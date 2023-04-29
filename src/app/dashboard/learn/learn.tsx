"use client";
import React, {
  useState,
  useTransition,
  cache,
  useEffect,
  Suspense,
} from "react";

import type { Category, Subject, User as UMetadata } from "~/types/db";
import Content from "./Content";
import LoadingSpinner from "~/app/(components)/LoadingSpinner";
import Dropdown from "./(components)/Dropdown";
type Categories = Array<Category>;
type Subjects = Array<
  Subject & {
    category: { name: string };
  }
>;
type ContentTypes = Array<string>;
type User =
  | (UMetadata & {
      education: { description: string | null };
    })
  | null;
type Props = {
  categories: Categories;
  subjects: Subjects;
  contentTypes: ContentTypes;
  userProfile: User;
};

const fetchLearnData = cache(
  async (
    category: string,
    subject: string,
    activity: string,
    userProfile: User
  ): Promise<string[]> => {
    const queryParams = new URLSearchParams({
      activity,
      category,
      subject,
      educationLevel: userProfile?.education?.description ?? "",
      dateOfBirth: userProfile?.dateOfBirth ?? "",
    });
    const data: { json: () => Promise<string[]> } = await fetch(
      `/api/learn?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );

    const json: string[] = await data.json();

    return json;
  }
);
const Learn = ({ categories, subjects, contentTypes, userProfile }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const filteredSubjects = selectedCategory
    ? subjects.filter((s) => s.category.name === selectedCategory)
    : [...subjects];

  useEffect(() => {
    if (selectedCategory && selectedSubject && selectedContentType) {
      const getLearnData = async () => {
        const data = await fetchLearnData(
          selectedCategory,
          selectedSubject,
          selectedContentType,
          userProfile
        );
        setData(data);
      };
      startTransition(() => void getLearnData());
    }
  }, [selectedCategory, selectedContentType, selectedSubject, userProfile]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Dropdown
          label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories.map((c) => c.name ?? "") ?? []}
          placeholder="Choose a category"
          name="category"
        />
        <Dropdown
          label="Subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          options={filteredSubjects.map((s) => s.name ?? "") ?? []}
          placeholder="Choose a subject"
          name="subject"
        />
        <Dropdown
          label="Activity"
          value={selectedContentType}
          onChange={(e) => setSelectedContentType(e.target.value)}
          options={contentTypes ?? []}
          placeholder="Choose an activity"
          name="contentType"
        />
      </div>
      {data.length > 0 ? (
        <Suspense fallback={<LoadingSpinner />}>
          {isPending ? <LoadingSpinner /> : <Content data={data} />}
        </Suspense>
      ) : null}
    </>
  );
};

export default Learn;
