import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });

  const [loanApplicationsCount, setLoanApplicationsCount] = useState(0);
  const [cryptoApplicationsCount, setCryptoApplicationsCount] = useState(0);
  const [creditApplicationsCount, setCreditApplicationsCount] = useState(0);

  const [userCreditCardApplications, setUserCreditCardApplications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [userCryptoApplications, setUserCryptoApplications] = useState([]);
  const [showCryptoPopup, setShowCryptoPopup] = useState(false);

  const [showLoanPopup, setShowLoanPopup] = useState(false);
  const [userLoanApplications, setUserLoanApplications] = useState([]);

  const [userData, setUserData] = useState([]);
  const [showUsersPopup, setShowUsersPopup] = useState(false);

  const [loanData, setLoanData] = useState([]);
  const [showAdminLoanPopup, setShowAdminLoanPopup] = useState(false);


  const [creditCardData, setCreditCardData] = useState([]);
  const [showAdminCreditPopup, setShowAdminCreditPopup] = useState(false);

  const [cryptoData, setCryptoData] = useState([]);
  const [showAdminCryptoPopup, setShowAdminCryptoPopup] = useState(false);



  const openPopup = async () => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const response = await fetch(`http://localhost:8008/api/user-credit-card-applications-details/${loggedInUser}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user credit card applications');
      }

      const data = await response.json();
      setUserCreditCardApplications(data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching user credit card applications:', error.message);
      // Handle error
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  
  const openCryptoPopup = async () => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const response = await fetch(`http://localhost:8008/api/user-crypto-applications-details/${loggedInUser}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user cryptocurrency applications');
      }
  
      const data = await response.json();
      setUserCryptoApplications(data);
      setShowCryptoPopup(true);
    } catch (error) {
      console.error('Error fetching user cryptocurrency applications:', error.message);
      // Handle error
    }
  };

  const closeCryptoPopup = () => {
    setShowCryptoPopup(false);
  };
  
  

  const openLoanPopup = async () => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const response = await fetch(`http://localhost:8008/api/user-loan-applications-details/${loggedInUser}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user loan applications');
      }
  
      const data = await response.json();
      setUserLoanApplications(data);
      setShowLoanPopup(true);
    } catch (error) {
      console.error('Error fetching user loan applications:', error.message);
      // Handle error
    }
  };
  
  const closeLoanPopup = () => {
    setShowLoanPopup(false);
  };
  
  
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      fetchUserDetails(loggedInUser);
      fetchCryptoApplicationsCount(loggedInUser);
      fetchCreditApplicationsCount(loggedInUser);
      fetchLoanApplicationsCount(loggedInUser);
      //fetchUserData();
    }
  }, []);
  
  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const userData = await response.json();
      setUserDetails({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: username, // You might want to set the username in state as well
      });
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      // Handle error
    }
  };

  const fetchLoanApplicationsCount = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user-loan-applications/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch loan applications count');
      }
  
      const data = await response.json();
      setLoanApplicationsCount(data.loanApplicationsCount);
    } catch (error) {
      console.error('Error fetching loan applications count:', error.message);
      
    }
  };

  const fetchCryptoApplicationsCount = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user-crypto-applications/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch crypto applications count');
      }
  
      const data = await response.json();
      setCryptoApplicationsCount(data.cryptoApplicationsCount);
    } catch (error) {
      console.error('Error fetching crypto applications count:', error.message);
      // Handle error
    }
  };

  const fetchCreditApplicationsCount = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user-credit-applications/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch crypto applications count');
      }
  
      const data = await response.json();
      setCreditApplicationsCount(data.creditApplicationsCount);
    } catch (error) {
      console.error('Error fetching crypto applications count:', error.message);
      // Handle error
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/get-all-users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUserData(data);
      setShowUsersPopup(true);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      // Handle error
    }
  };

  const closeUserDataPopup = () => {
    setShowUsersPopup(false);
  };



  const fetchLoanData = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/get-all-loans`);
      if (!response.ok) {
        throw new Error('Failed to fetch loan applications');
      }

      const data = await response.json();
      setLoanData(data);
      setShowAdminLoanPopup(true);
    } catch (error) {
      console.error('Error fetching loan applications:', error.message);
      // Handle error
    }
  };

  const closeAdminLoanDataPopup = () => {
    setShowAdminLoanPopup(false);
  };


  const fetchCreditCardData = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/get-all-credit-cards`);
      if (!response.ok) {
        throw new Error('Failed to fetch credit card applications');
      }

      const data = await response.json();
      setCreditCardData(data);
      setShowAdminCreditPopup(true);
    } catch (error) {
      console.error('Error fetching credit card applications:', error.message);
      // Handle error
    }
  };

  const closeAdminCreditDataPopup = () => {
    setShowAdminCreditPopup(false);
  };



  const fetchCryptoData = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/get-all-crypto`);
      if (!response.ok) {
        throw new Error('Failed to fetch crypto applications');
      }

      const data = await response.json();
      setCryptoData(data);
      setShowAdminCryptoPopup(true);
    } catch (error) {
      console.error('Error fetching crypto applications:', error.message);
      // Handle error
    }
  };

  const closeAdminCryptoDataPopup = () => {
    setShowAdminCryptoPopup(false);
  };

  
  return (
    <div className="container mx-auto mt-8 p-8">
      {userDetails.username !== 'admin' ? (
        <div>
        <h1 className="text-2xl mb-4 text-white font-sans"> Hello {`${userDetails.firstName} ${userDetails.lastName}`}!!!</h1>
        <br/>
        <h3 className="text-l mb-4 text-white font-sans"> View your active application: </h3>
        <br/>


        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center border border-gray-300 p-4">


          <div className="border-b-2 pb-2">
            <button onClick={openPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Credit Card Application
            </button>
            <br/>
            <br/>
            <p className="text-white text-xs">Total Credit Card Applications: {creditApplicationsCount}</p>          
          </div>


          <div className="border-b-2 pb-2">
            <button onClick={openLoanPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Loan Application
            </button>
            <br/>
            <br/>
            <p className="text-white text-xs">Total Loan Applications: {loanApplicationsCount}</p>
          </div>


          <div className="border-b-2 pb-2">
            <button onClick={openCryptoPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Cryptocurrency Application
            </button>
            <br/>
            <br/>

            <p className="text-white text-xs">Total Crypto Applications: {cryptoApplicationsCount}</p>
          </div>
        </div>
      </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-white">Welcome Admin!</h1>
          <br />
          <br />
          <br />
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-center border border-gray-300 p-4">
            <div className="border-b-2 pb-2">
              <button
                onClick={fetchUserData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Users
              </button>
            </div>
            <div className="border-b-2 pb-2">
              <button
                onClick={fetchLoanData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Loan Applications
              </button>
            </div>
            <div className="border-b-2 pb-2">
              <button
                onClick={fetchCreditCardData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Credit Card Applications
              </button>
            </div>
            <div className="border-b-2 pb-2">
              <button
                onClick={fetchCryptoData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Crypto Applications
              </button>
            </div>
          </div>
        </div>
      )
      
      
      }


{showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      Credit Card Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Credit Card Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Applied Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userCreditCardApplications.map((app, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">{app.creditcardname}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.appliedDate}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closePopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showCryptoPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      Crypto Investment Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              CryptoCurrency 
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Amount Invested
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date Applied
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userCryptoApplications.map((app, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">{app.cryptocurrencyType}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.amount}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.appliedDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeCryptoPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



{showLoanPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      Loan Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Loan Type 
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Total Loan Taken
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Loan Repayment Period
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Interest Rate
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date Applied
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userLoanApplications.map((app, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">Personal Loan</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.loanAmount}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.loanRepaymentPeriod}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.interestRate}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.appliedDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeLoanPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

  {/* For admin popup */}


  {showUsersPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      Active users
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              First Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Last Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date of birth
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Email ID
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userData.map((app, index) => (
                            <tr key={index}>
                              
                              <td className="px-6 py-4 whitespace-nowrap">{app.firstName}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.lastName}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.username}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.dob}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeUserDataPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


{showAdminLoanPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      All Loan Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Email ID
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Loan Amount 
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Credit Score
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Interest Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {loanData.map((app, index) => (
                            <tr key={index}>
                              
                              <td className="px-6 py-4 whitespace-nowrap">{app.username}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.loanAmount}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.creditScore}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.interestRate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeAdminLoanDataPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


{showAdminCreditPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      All Credit Card Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Email ID
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Credit Card Name 
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Credit Score
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Application Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {creditCardData.map((app, index) => (
                            <tr key={index}>
                              
                              <td className="px-6 py-4 whitespace-nowrap">{app.fullName}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.creditcardname}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.creditScore}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeAdminCreditDataPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    {showAdminCryptoPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                      All Crypto Currency Applications
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Crypto Currency Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Amount Invested
                            </th>
                            
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cryptoData.map((app, index) => (
                            <tr key={index}>
                              
                              <td className="px-6 py-4 whitespace-nowrap">{app.username}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.cryptocurrencyType}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{app.amount}</td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeAdminCryptoDataPopup}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     

      
    </div>

    

  );
};

export default Profile;
