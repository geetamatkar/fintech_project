import React from "react";
import { useNavigate } from 'react-router-dom';

const ReviewButton = ({ styles }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // setRegistrationOpen(true);
    navigate('/ReviewForm');
  };

  return (
    <button
      onClick={handleGetStartedClick}
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    >
      Add Review
    </button>
  );
};

export default ReviewButton;
