import React, { useState } from 'react';

const PersonalLoan = () => {
  const [formData, setFormData] = useState({
    email: '',
    //phoneNumber: '',
    monthlyIncome: '',
    loanAmount: '',
    hasCurrentLoan: false,
    numberOfLoans: 0,
    loanTypes: '',
    totalLoanAmount: 0.00,
    //proofOfIncome: null,
    payStub: null,
    ssnNumber: '',
    loanReason: '',
    dateOfBirth: '',
    creditScore: '',
    loanRepaymentPeriod: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === 'hasCurrentLoan' ? (value === 'true' ? 1 : 0) : value;
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handleInputChangeLoan = (e) => {
    const { name, value, type } = e.target;
  
    // Convert boolean value to 0 or 1 if the input type is 'checkbox'
    const newValue = type === 'checkbox' ? (e.target.checked ? 1 : 0) : value;
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send formData to the server
    console.log('Form Data:', formData);

    const dataToSend = { ...formData };
    if (formData.hasCurrentLoan === 'No') {
    
    dataToSend.numberOfLoans = 0;
    dataToSend.loanTypes = null;
    dataToSend.totalLoanAmount = 0.00;
  }

    try {
        const response = await fetch('http://localhost:8008/api/personal-loan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
         // body: JSON.stringify({ email, phoneNumber, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans
       // , numberOfLoans, loanTypes, totalLoanAmount, payStub, ssnNumber }),
        });
    
        if (response.ok) {
          console.log('Loan application submitted successfully');
          // Reset form after submission
          setFormData({
            // Reset your form fields here
            email: '',
           // phoneNumber: '',
            monthlyIncome: '',
            loanAmount: '',
            hasCurrentLoan: false,
            numberOfLoans: 0,
            loanTypes: '',
            totalLoanAmount: '',
            // proofOfIncome: null,
            payStub: null,
            ssnNumber: '',
            loanReason: '',

          });
        } else {
          console.error('Failed to submit loan application');
        }
      } catch (error) {
        console.error('Error submitting loan application:', error);
      }
    // Reset form after submission
    /*
    setFormData({
      email: '',
      phoneNumber: '',
      monthlyIncome: '',
      loanAmount: '',
      hasCurrentLoan: false,
      numberOfLoans: 0,
      loanTypes: '',
      totalLoanAmount: '',
     // proofOfIncome: null,
      payStub: null,
      ssnNumber: '',
    });*/
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Personal Loan Application</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for user details */}
        {/* Add appropriate input fields with respective onChange handlers */}
        {/* Example: */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-600">
            Monthly Income:
          </label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loanAmount" className="text-sm font-medium text-gray-600">
            Amount of Loan Needed:
          </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.loanAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        
        <div className="flex flex-col">
          <label htmlFor="ssnNumber" className="text-sm font-medium text-gray-600">
            SSN Number:
          </label>
          <input
            type="text"
            id="ssnNumber"
            name="ssnNumber"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.ssnNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hasCurrentLoan" className="text-sm font-medium text-gray-600">
            Currently have a loan:
          </label>
          <select
            id="hasCurrentLoan"
            name="hasCurrentLoan"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.hasCurrent}
            onChange={handleInputChange}
            required
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        {formData.hasCurrentLoan && (
          <div className="flex flex-col">
            <label htmlFor="numberOfLoans" className="text-sm font-medium text-gray-600">
              Number of current loans:
            </label>
            <input
              type="number"
              id="numberOfLoans"
              name="numberOfLoans"
              className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={formData.numberOfLoans}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {formData.hasCurrentLoan && (
          <div className="flex flex-col">
            <label htmlFor="loanTypes" className="text-sm font-medium text-gray-600">
              Loan types (comma-separated):
            </label>
            <input
              type="text"
              id="loanTypes"
              name="loanTypes"
              className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={formData.loanTypes}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {formData.hasCurrentLoan && (
          <div className="flex flex-col">
            <label htmlFor="totalLoanAmount" className="text-sm font-medium text-gray-600">
              Total loan amount:
            </label>
            <input
              type="number"
              id="totalLoanAmount"
              name="totalLoanAmount"
              className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={formData.totalLoanAmount}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

<div className="flex flex-col">
          <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="creditScore" className="text-sm font-medium text-gray-600">
            Credit Score:
          </label>
          <input
            type="number"
            id="creditScore"
            name="creditScore"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.creditScore}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loanRepaymentPeriod" className="text-sm font-medium text-gray-600">
            Loan Repayment Period (months):
          </label>
          <input
            type="number"
            id="loanRepaymentPeriod"
            name="loanRepaymentPeriod"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.loanRepaymentPeriod}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loanReason" className="text-sm font-medium text-gray-600">
            Purpose for Applying Loan:
          </label>
          <input
            id="loanReason"
            name="loanReason"
            rows="4"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={formData.loanReason}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalLoan;
 /**
  <div className="flex flex-col">
          <label htmlFor="proofOfIncome" className="text-sm font-medium text-gray-600">
            Proof of Income:
          </label>
          <input
            type="file"
            id="proofOfIncome"
            name="proofOfIncome"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleFileUpload}
            required
          />
        </div>
  */