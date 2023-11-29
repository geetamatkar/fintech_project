// ReviewForm.jsx

import React, { useState, useEffect } from "react";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // Perform any validation if needed
    const reviewData = { name, title, content };

    // Save the review data to local storage
    localStorage.setItem("reviewData", JSON.stringify(reviewData));

    // Show an alert message
    alert("Review submitted successfully! Your feedback has been stored.");
    
    setName("");
    setTitle("");
    setContent("");
  };

  // Retrieve the stored data from local storage
  const storedReviewData = JSON.parse(localStorage.getItem("reviewData")) || {};
  {/*
  // Set the initial state with the stored data
  useEffect(() => {
    setName(storedReviewData.name || "");
    setTitle(storedReviewData.title || "");
    setContent(storedReviewData.content || "");
  }, []);*/}

  return (
    <div className="flex-col min-h-fit flex justify-center">
      <div className="max-w-xl mx-auto mt-16 p-16 border rounded shadow-md w-full">
        <div className="bg-white p-6 rounded shadow-lg z-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Write a Review</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Review:
            </label>
            <textarea
              id="content"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;