"use client";
import React, { useState, use, cache, useEffect } from "react";

import type { Database } from "~/types/supabase";
import supabase from "~/utils/supabase";
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
  activity: string,
  category: string,
  contentType: string,
  userProfile: User
) => {
  const queryParams = new URLSearchParams({
    activity,
    category,
    contentType,
    educationLevel: userProfile?.education?.description ?? "",
    dateOfBirth: userProfile?.dateOfBirth ?? "",
  });
  const data = await fetch(`/api/learn?${queryParams.toString()}`).then((r) =>
    r.json()
  );

  return data;
};
const Learn = ({ categories, subjects, contentTypes, userProfile }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [data, setData] = useState("");
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
          Content Type:{" "}
        </label>
        <select
          id="contentType"
          value={selectedContentType}
          onChange={(e) => setSelectedContentType(e.target.value)}
          className="w-full rounded bg-white p-2 text-primary"
        >
          <option value="">Choose a content type</option>
          {contentTypes.map((contentType, index) => (
            <option key={index} value={contentType ?? ""}>
              {contentType ?? ""}
            </option>
          ))}
        </select>
      </div>
      {data}
    </>
  );
};

export default Learn;
