import React from 'react';
import { homeloan, personalloan, auto } from '../assets';
import { useNavigate } from 'react-router-dom';


const LoanTypes = () => {

  const navigate = useNavigate();
  const redirectToPersonalLoan = () => {
    navigate('/personal-loan'); // Redirect to the PersonalLoan route
  };

  const redirectToHomeLoan = () => {
    navigate('/home-loan'); // Redirect to the PersonalLoan route
  };

  const redirectToAutoLoan = () => {
    navigate('/auto-loan'); // Redirect to the PersonalLoan route
  };
  return (
    <div className="flex flex-wrap justify-center">
      {/* Personal Loan */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Personal Loan</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={personalloan}
          alt="Personal Loan"
        />
          <p className="text-gray-700 text-base">
            A personal loan is a versatile financial product that can be used for various purposes.
          </p>
          <ul className="list-disc list-inside">
            <li>Competitive APR rates</li>
            <li>Flexible repayment tenure</li>
            <li>No collateral required</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={redirectToPersonalLoan} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Housing Loan */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Housing Loan</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={homeloan}
          alt="Home Loan"
        />
          <p className="text-gray-700 text-base">
            A housing loan is designed to help individuals finance the purchase or construction of a home.
          </p>
          <ul className="list-disc list-inside">
            <li>Low-interest rates for home financing</li>
            <li>Extended repayment tenure for affordability</li>
            <li>Possibility of tax benefits</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={redirectToHomeLoan} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Auto Loan */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Auto Loan</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={auto}
          alt="Auto Loan"
        />
          <p className="text-gray-700 text-base">
            An auto loan provides financing for the purchase of a vehicle, whether new or used.
          </p>
          <ul className="list-disc list-inside">
            <li>Competitive APR rates for vehicle financing</li>
            <li>Flexible repayment options</li>
            <li>Quick approval process</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={redirectToAutoLoan} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanTypes;
