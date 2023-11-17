import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Login from './Login';
import HomeLoan from './HomeLoan';
import PersonalLoan from './PersonalLoan';
import AutoLoan from './AutoLoan';
import Services from './Services';
import CreditCards from './Creditcards';
import LoanTypes from './LoanTypes';
import Cryptocurrency from './CryptoCurrency';
import CreditCardApplyForm from './CreditCardApplyForm';
import Contact from './Contact';

const AutoCompleteSearch = ({ onItemSelected }) => {
  const suggestions = [
    { path: '/register', label: 'Registration', element: <RegistrationForm /> },
    { path: '/login', label: 'Login', element: <Login /> },
    { path: '/home-loan', label: 'Home Loan Application', element: <HomeLoan /> },
    { path: '/personal-loan', label: 'Personal Loan Application', element: <PersonalLoan /> },
    { path: '/auto-loan', label: 'Auto Loan Application', element: <AutoLoan /> },
    { path: '/services', label: 'Services', element: <Services /> },
    { path: '/creditcards', label: 'Credit Cards', element: <CreditCards /> },
    { path: '/loans', label: 'Loans', element: <LoanTypes /> },
    { path: '/cryptocurrency', label: 'Cryptocurrency', element: <Cryptocurrency /> },
    { path: '/credit-card', label: 'Credit Card Apply Form', element: <CreditCardApplyForm /> },
    { path: '/contact', label: 'Contact', element: <Contact /> },
  ];


  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);

    // Filter suggestions based on input
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    setFilteredSuggestions(filtered);
  };

  const handleItemClick = (selectedItem) => {
    setInputValue(selectedItem.label);
    setFilteredSuggestions([]); // Clear suggestions
    setIsDropdownOpen(false);
    onItemSelected(selectedItem);
  };

  const handleInputBlur = () => {
    // Use a timeout to allow time for the click event to register
    setTimeout(() => {
      if (!inputRef.current.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 0);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    // Attach event listener when component mounts
    document.addEventListener('mousedown', handleInputBlur);

    // Detach event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleInputBlur);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search..."
        className="py-2 px-4 border rounded-md w-64 focus:outline-none focus:border-blue-500"
      />
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-md z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(suggestion)}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200"
            >
              <Link to={suggestion.path}>{suggestion.label}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
