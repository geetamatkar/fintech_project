import React, { useState } from 'react';
import HomeLoan from './HomeLoan';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PersonalLoan from './PersonalLoan';

const Loan = () => {
  const [selectedLoan, setSelectedLoan] = useState('');
  const navigate = useNavigate();


  const handleLoanSelection = (e) => {
    setSelectedLoan(e.target.value);

    if (e.target.value === 'homeLoan') {
        navigate("/home-loan");
      }

    if (e.target.value === 'personalLoan') {
        navigate("/personal-loan");
      }

      if (e.target.value === 'autoLoan') {
        navigate("/auto-loan");
      }
  };

  return (
   
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Select Loan Type</h2>
      <div className="flex flex-col">
        <label htmlFor="loanType" className="text-sm font-medium text-gray-600">
          Loan Type:
        </label>
        <select
          id="loanType"
          className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={selectedLoan}
          onChange={handleLoanSelection}
        >
          <option value="">Select Loan Type</option>
          <option value="homeLoan">Home Loan</option>
          <option value="autoLoan">Auto Loan</option>
          <option value="personalLoan">Personal Loan</option>
        </select>
      </div>
      
    

      
    </div>
  
  );
};

export default Loan;


/**
 {selectedLoan === 'homeLoan' && (
        <Link to="/home-loan" className="text-blue-500 hover:underline">
          Apply for Home Loan
        </Link>
      )}

 */