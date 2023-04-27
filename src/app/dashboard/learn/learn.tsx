"use client";
import React, { useState } from "react";

import type { Database } from "~/types/supabase";
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Categories = Array<Category>;
type Subjects = Array<Database["public"]["Tables"]["subjects"]["Row"]>;
type ContentTypes = Array<string | null>;
type Props = {
  categories: Categories;
  subjects: Subjects;
  contentTypes: ContentTypes;
};
const Learn = ({ categories, subjects, contentTypes }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");

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
          {subjects.map((subject, index) => (
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
    </>
  );
};

export default Learn;
