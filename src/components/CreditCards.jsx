import React from 'react';
import { sapphire, freedomflex, unlimited } from '../assets';
import { useNavigate } from 'react-router-dom';

const CreditCards = () => {
  const navigate = useNavigate();

  const redirectToCreditCardForm = (cardName) => {
    navigate('/credit-card'); // Redirect to the PersonalLoan route
    localStorage.setItem('cardName', cardName);
  };
  return (
    <div className="flex flex-wrap justify-center">
      {/* Sapphire Preferred Card */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">SAPPHIRE PREFERRED® CREDIT CARD</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={sapphire}
          alt="Sapphire Preferred Card"
        />
          <p className="text-gray-700 text-base">
            <ul className="list-disc list-inside">
              <li>Earn 60,000 bonus points</li>
              <li>Earn 3X on dining and 2X on travel</li>
              <li>$95 Annual Fee</li>
            </ul>
          </p>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={() => redirectToCreditCardForm('SAPPHIRE PREFERRED® CREDIT CARD')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Freedom Unlimited Card */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">FREEDOM UNLIMITED® CREDIT CARD</div>
          <img
         className="w-full h-30 object-cover"
         style={{ padding: '10px' }} 
         src={unlimited}
          alt="Freedom Unlimited Card"
        />
          <p className="text-gray-700 text-base">
            <ul className="list-disc list-inside">
              <li>Earn a $200 bonus + 5% gas and grocery store offer</li>
              <li>Earn unlimited 1.5% cash back or more on all purchases</li>
              <li>No Annual Fee</li>
            </ul>
          </p>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={() => redirectToCreditCardForm('FREEDOM UNLIMITED® CREDIT CARD')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Freedom Flex Card */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">FREEDOM FLEX® CREDIT CARD</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={freedomflex}
          alt="Freedom Flex Card"
        />
          <p className="text-gray-700 text-base">
            <ul className="list-disc list-inside">
              <li>Earn a $200 bonus + 5% gas and grocery store offer</li>
              <li>Earn 5% cash back on quarterly bonus categories (spend limits apply, must activate quarterly)</li>
              <li>No Annual Fee</li>
            </ul>
          </p>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
          <button onClick={() => redirectToCreditCardForm('FREEDOM FLEX® CREDIT CARD')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCards;
