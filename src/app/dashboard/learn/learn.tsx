import React, { useState } from 'react';

import type { Database } from '~/types/supabase';
type Categories = Array<Database['public']['Tables']['categories']['Row']>;
type Subjects = Array<Database['public']['Tables']['subjects']['Row']>;
type ContentTypes = Array<string | null>;
type Props = {
	categories: Categories;
	subjects: Subjects;
	contentTypes: ContentTypes;
}
const Learn = ({ categories, subjects, contentTypes }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedContentType, setSelectedContentType] = useState('');

  return (
    <div className="bg-primary p-8 rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4">Select your learning preferences</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block mb-1">Category: </label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-white text-primary p-2 rounded">
            <option value="">Choose a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category?.name ?? ''}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1">Subject: </label>
          <select id="subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full bg-white text-primary p-2 rounded">
            <option value="">Choose a subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject?.name ?? ''}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contentType" className="block mb-1">Content Type: </label>
          <select id="contentType" value={selectedContentType} onChange={(e) => setSelectedContentType(e.target.value)} className="w-full bg-white text-primary p-2 rounded">
            <option value="">Choose a content type</option>
            {contentTypes.map((contentType, index) => (
              <option key={index} value={contentType ?? ''}>
                {contentType ?? ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Learn;
