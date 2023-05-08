"use client";
import React, { useState, Suspense } from "react";

import type {
  Category,
  Subject,
  User as UMetadata,
} from "~/types/database.types";
import Content from "./Content";
import LoadingSpinner from "~/app/(components)/LoadingSpinner";
import Dropdown from "./(components)/Dropdown";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
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
  data: string[];
  categories: Categories;
  subjects: Subjects;
  contentTypes: ContentTypes;
  userProfile: User;
};

const Learn = ({ categories, data, subjects, contentTypes }: Props) => {
  // const [data, setData] = useState<string[]>([]);
  const router = useRouter();
  const query = useSearchParams();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState(
    (query.get("category") as string) ?? ""
  );
  const [selectedSubject, setSelectedSubject] = useState(
    (query.get("subject") as string) ?? ""
  );
  const [selectedContentType, setSelectedContentType] = useState(
    (query.get("activity") as string) ?? ""
  );
  const filteredSubjects = selectedCategory
    ? subjects.filter((s) => s.category.name === selectedCategory)
    : [...subjects];

  console.log(query.get("subject"));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Dropdown
          label="Category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            const params = new URLSearchParams({
              category: e.target.value,
              activity: selectedContentType,
            }).toString();
            router.replace(`${pathname}?${params}`);
          }}
          options={categories.map((c) => c.name ?? "") ?? []}
          placeholder="Choose a category"
          name="category"
        />
        <Dropdown
          label="Subject"
          value={selectedSubject}
          onChange={(e) => {
            const params = new URLSearchParams({
              category: selectedCategory,
              subject: e.target.value,
              activity: selectedContentType,
            }).toString();
            setSelectedSubject(e.target.value);
            router.replace(`${pathname}?${params}`);
          }}
          options={filteredSubjects.map((s) => s.name ?? "") ?? []}
          placeholder="Choose a subject"
          name="subject"
        />
        <Dropdown
          label="Activity"
          value={selectedContentType}
          onChange={(e) => {
            setSelectedContentType(e.target.value);
            const params = new URLSearchParams({
              category: selectedCategory,
              subject: selectedSubject,
              activity: e.target.value,
            }).toString();
            router.replace(`${pathname}?${params}`);
          }}
          options={contentTypes ?? []}
          placeholder="Choose an activity"
          name="contentType"
        />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Content data={data} />
      </Suspense>
    </>
  );
};

export default Learn;
