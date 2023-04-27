"use client";
import React, { useState, use, cache, useEffect } from "react";

import type { Database } from "~/types/supabase";
import { type Choice } from "~/utils/chatGPTRequest";
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Categories = Array<Category>;
type Subjects = Array<
  Database["public"]["Tables"]["subjects"]["Row"] & {
    category: { name: string };
  }
>;
type ContentTypes = Array<string | null>;
type User =
  | (Database["public"]["Tables"]["user"]["Row"] & {
      education: { description: string | null };
    })
  | null;
type Props = {
  categories: Categories;
  subjects: Subjects;
  contentTypes: ContentTypes;
  userProfile: User;
};

const fetchLearnData = async (
  category: string,
  subject: string,
  activity: string,
  userProfile: User
) => {
  const queryParams = new URLSearchParams({
    activity,
    category,
    subject,
    educationLevel: userProfile?.education?.description ?? "",
    dateOfBirth: userProfile?.dateOfBirth ?? "",
  });
  const data = await fetch(`/api/learn?${queryParams.toString()}`, {
    method: "GET",
  }).then((res) => res.json());

  return data;
};
const Learn = ({ categories, subjects, contentTypes, userProfile }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [data, setData] = useState<Choice[]>([]);
  // const
  const filteredSubjects = selectedCategory
    ? subjects.filter((s) => s.category.name === selectedCategory)
    : [...subjects];

  useEffect(() => {
    if (selectedCategory && selectedSubject && selectedContentType) {
      fetchLearnData(
        selectedCategory,
        selectedSubject,
        selectedContentType,
        userProfile
      ).then(setData);
    }
  }, [selectedCategory, selectedContentType, selectedSubject, userProfile]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="category" className="mb-1 block">
            Category:{" "}
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded bg-white p-2 text-primary"
          >
            <option value="">Choose a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category?.name ?? ""}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block">
            Subject:{" "}
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full rounded bg-white p-2 text-primary"
          >
            <option value="">Choose a subject</option>
            {filteredSubjects.map((subject, index) => (
              <option key={index} value={subject?.name ?? ""}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contentType" className="mb-1 block">
            Activity:{" "}
          </label>
          <select
            id="contentType"
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="w-full rounded bg-white p-2 text-primary"
          >
            <option value="">Choose an activity</option>
            {contentTypes.map((contentType, index) => (
              <option key={index} value={contentType ?? ""}>
                {contentType ?? ""}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-8 rounded-lg bg-secondary p-8 text-white">
        <h2 className="mb-4 text-xl font-bold">Content:</h2>
        <pre className="whitespace-pre-wrap">
          {data?.map((x) => x.message.content)}
        </pre>
      </div>
    </>
  );
};

export default Learn;
