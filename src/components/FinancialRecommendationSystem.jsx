import React, { useState, useEffect } from 'react';

// Sample knowledge base - rules for recommending credit cards
const creditCardRecommendations = {
  income: {
    high: 'Platinum Card',
    medium: 'Gold Card',
    low: 'Standard Card',
  },
  creditScore: {
    excellent: 'Rewards Card',
    good: 'Cashback Card',
    fair: 'Basic Card',
    poor: 'Secured Card',
  },
  debt: {
    low: 'Travel Card',
    moderate: 'Balance Transfer Card',
    high: 'Low APR Card',
  },
};

// Define default user input outside the component to prevent redefinition on each render
const defaultUserInput = {
    income: '',
    creditScore: '',
    debt: '',
  };

const FinancialRecommendationSystem = () => {

    const [userInput, setUserInput] = useState(defaultUserInput);

  const handleInputChange = (field, value) => {
    setUserInput({
      ...userInput,
      [field]: value,
    });
  };

  const getCreditCardRecommendation = () => {
    const { income, creditScore, debt } = userInput;

    // Check if the user input exists in the knowledge base
    if (
      creditCardRecommendations.income[income] &&
      creditCardRecommendations.creditScore[creditScore] &&
      creditCardRecommendations.debt[debt]
    ) {
      // Use the knowledge base to recommend a credit card
      return (
        <div>
          <p>{creditCardRecommendations.income[income]}</p>
          <p>{creditCardRecommendations.creditScore[creditScore]}</p>
          <p>{creditCardRecommendations.debt[debt]}</p>
        </div>
      );
    } else {
      return <p>Sorry, we couldn't provide a recommendation based on your input.</p>;
    }
  };

  useEffect(() => {
    // Reset the form to default values when the component mounts
    setUserInput(defaultUserInput);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-4">Financial Recommendation System</h1>
      <form className="mb-4">
        <div className="mb-4">
          <label className="block mb-2">Income:</label>
          <select
            className="bg-gray-700 text-white py-2 px-4 rounded"
            onChange={(e) => handleInputChange('income', e.target.value)}
            value={userInput.income}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Credit Score:</label>
          <select
            className="bg-gray-700 text-white py-2 px-4 rounded"
            onChange={(e) => handleInputChange('creditScore', e.target.value)}
            value={userInput.creditScore}
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Debt Level:</label>
          <select
            className="bg-gray-700 text-white py-2 px-4 rounded"
            onChange={(e) => handleInputChange('debt', e.target.value)}
            value={userInput.debt}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </form>

      <div className="mb-4">
        <h2 className="text-2xl mb-2 text-gray-300">Recommended Credit Card:</h2>
        <div className="bg-gray-800 text-white py-4 px-6 rounded text-2xl shadow-md text-center text-bold">
            {getCreditCardRecommendation()}
        </div>
        </div>
    </div>
  );
};

export default FinancialRecommendationSystem;
