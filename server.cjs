const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fintech',
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/register', (req, res) => {
    const { firstName, lastName, dob, email, username, password } = req.body;
  
    const registerUserQuery =
      'INSERT INTO users (firstName, lastName, dob, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
  
    db.query(
      registerUserQuery,
      [firstName, lastName, dob, email, username, password],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('User registered successfully');
        }
      }
    );
  });



app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const selectUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(selectUserQuery, [username, password], (err, results) => {
    if (err) {
      console.error('Error selecting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(results);
      if (results.length > 0) {
        const user = {
          username: results[0].username,
          password: results[0].password,
          usertype: results[0].usertype
        };
        console.log(user);
        res.status(200).send({
          status: 200,
          message: "Login Successful",
          data: { user }
        });
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  });
});

app.post('/api/home-loan', (req, res) => {
  const {
    email,
    //phoneNumber,
    monthlyIncome,
    loanAmount,
    hasCurrentLoan,
    numberOfLoans,
    loanTypes,
    totalLoanAmount,
    //proofOfIncome,
    ssnNumber,
    propertyAddress,
    propertyType,
    propertyValue,
    creditScore,
    loanReason,
  } = req.body;

  const insertLoanQuery = `INSERT INTO home_loan 
    (email, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans, loanTypes, totalLoanAmount,ssnNumber, loanReason, propertyAddress, propertyType, propertyValue,creditScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertLoanQuery,
    [
      email,
      //phoneNumber,
      monthlyIncome,
      loanAmount,
      hasCurrentLoan,
      numberOfLoans,
      loanTypes,
      totalLoanAmount,
      //proofOfIncome,
      ssnNumber,
      loanReason,
      propertyAddress,
      propertyType,
      propertyValue,
      creditScore,
      
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting loan data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Loan application submitted successfully');
      }
    }
  );
});



app.post('/api/personal-loan', (req, res) => {
  const {
    email,
    monthlyIncome,
    loanAmount,
    hasCurrentLoan,
    numberOfLoans,
    loanTypes,
    totalLoanAmount,
    ssnNumber,
    loanReason,
    dateOfBirth,
    creditScore,
    loanRepaymentPeriod,
  } = req.body;

  const insertPersonalLoanQuery = `INSERT INTO personal_loan 
    (email, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans, loanTypes, totalLoanAmount, ssnNumber, loanReason, dateOfBirth, creditScore, loanRepaymentPeriod) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertPersonalLoanQuery,
    [
      email,
      monthlyIncome,
      loanAmount,
      hasCurrentLoan,
      numberOfLoans,
      loanTypes,
      totalLoanAmount,
      ssnNumber,
      loanReason,
      dateOfBirth,
      creditScore,
      loanRepaymentPeriod,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting personal loan data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Personal loan application submitted successfully');
      }
    }
  );
});


app.post('/api/auto-loan', (req, res) => {
  const {
    email,
    monthlyIncome,
    loanAmount,
    hasCurrentLoan,
    numberOfLoans,
    loanTypes,
    totalLoanAmount,
    ssnNumber,
    loanReason,
    dateOfBirth,
    creditScore,
    loanRepaymentPeriod,
    makeAndModel,
    purchasePrice,
    VIN,
    yearOfManufacture,
  } = req.body;

  const insertAutoLoanQuery = `INSERT INTO auto_loan 
    (email, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans, loanTypes, totalLoanAmount, ssnNumber, loanReason, dateOfBirth, creditScore, loanRepaymentPeriod, makeAndModel, purchasePrice, VIN, yearOfManufacture) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertAutoLoanQuery,
    [
      email,
      monthlyIncome,
      loanAmount,
      hasCurrentLoan,
      numberOfLoans,
      loanTypes,
      totalLoanAmount,
      ssnNumber,
      loanReason,
      dateOfBirth,
      creditScore,
      loanRepaymentPeriod,
      makeAndModel,
      purchasePrice,
      VIN,
      yearOfManufacture,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting auto loan data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Auto loan application submitted successfully');
      }
    }
  );
});


app.post('/api/credit-card', (req, res) => {
  const {
    fullName,
    dateOfBirth,
    ssn,
    email,
    phoneNumber,
    bankAccountNumber,
    employmentStatus,
    annualIncome,
    monthlyHousingRent,
    numExistingCreditCards,
    creditScore,
  } = req.body;

  const insertCreditCardApplicationQuery = `INSERT INTO credit_card_application 
    (fullName, dateOfBirth, ssn, email, phoneNumber, bankAccountNumber, employmentStatus, annualIncome, monthlyHousingRent, numExistingCreditCards, creditScore) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertCreditCardApplicationQuery,
    [
      fullName,
      dateOfBirth,
      ssn,
      email,
      phoneNumber,
      bankAccountNumber,
      employmentStatus,
      annualIncome,
      monthlyHousingRent,
      numExistingCreditCards,
      creditScore,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting credit card application data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Credit card application submitted successfully');
      }
    }
  );
});










