import React, { useState, useEffect, useMemo } from "react";
import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";
import ReviewButton from "./ReviewButton";

const Testimonials = () => {
  const reviewsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [allFeedback, setAllFeedback] = useState([]);
  const [renderedFeedback, setRenderedFeedback] = useState([]);

    const storedReviewData = JSON.parse(localStorage.getItem("reviewData")) || [];
    const storedReviewArray = Array.isArray(storedReviewData) ? storedReviewData : [storedReviewData];

  useEffect(() => {
    // Combine the stored and predefined feedback data
    setAllFeedback([...storedReviewArray, ...feedback]);
  }, []); // Run once on mount

  // Calculate the index range for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  // Memoize the current reviews to avoid recalculating on every render
  const currentReviews = useMemo(() => allFeedback.slice(indexOfFirstReview, indexOfLastReview), [
    allFeedback,
    indexOfFirstReview,
    indexOfLastReview,
  ]);

  // Update reviews when the stored data changes
  useEffect(() => {
    setRenderedFeedback(currentReviews);
  }, [currentReviews]);

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
     
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2 className={styles.heading2}>
          What People are <br className="sm:block hidden" /> saying about us
        </h2>
        <div className="w-full md:mt-0 mt-6"></div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {renderedFeedback.map((review) => (
          <FeedbackCard key={review.id} {...review} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(allFeedback.length / reviewsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ReviewButton styles={`mt-10`} />
    </section>
  );
};

export default Testimonials;
