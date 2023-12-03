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
    username, 
    interestRate
  } = req.body;

  const insertPersonalLoanQuery = `INSERT INTO personal_loan 
    (email, monthlyIncome, loanAmount, hasCurrentLoan, numberOfLoans, loanTypes, totalLoanAmount, ssnNumber, loanReason, dateOfBirth, creditScore, loanRepaymentPeriod, username, interestRate) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      username, 
      interestRate
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
    username,
    status,
    creditcardname

  } = req.body;

  const insertCreditCardApplicationQuery = `INSERT INTO credit_card_application 
    (fullName, dateOfBirth, ssn, email, phoneNumber, bankAccountNumber, employmentStatus, annualIncome, monthlyHousingRent, numExistingCreditCards, creditScore, username, status, creditcardname) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      username,
      status,
      creditcardname
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

app.post('/api/crypto-form', (req, res) => {
  const { username, amount, accountNumber, cryptocurrencyType } = req.body;

  // Assuming 'crypto_form' is the name of your table for crypto form data
  const insertCryptoFormQuery = `INSERT INTO crypto_form (username, amount, accountNumber, cryptocurrencyType) VALUES (?, ?, ?, ?)`;

  db.query(insertCryptoFormQuery, [username, amount, accountNumber, cryptocurrencyType], (err, result) => {
    if (err) {
      console.error('Error inserting crypto form data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Crypto form submitted successfully');
    }
  });
});

app.get('/api/get-user-details', (req, res) => {
  const username = req.query.username; // Assuming the username is sent as a query parameter

  const getUserDetailsQuery = 'SELECT firstName, lastName, username FROM users WHERE username = ?';

  db.query(getUserDetailsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const { firstName, lastName, username } = results[0];
        res.status(200).send({ firstName, lastName, username });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;

  const getUserDetailsQuery = 'SELECT firstName, lastName FROM users WHERE username = ?';

  db.query(getUserDetailsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const { firstName, lastName } = results[0];
        res.status(200).send({ firstName, lastName });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

app.get('/api/user-crypto-applications/:username', (req, res) => {
  const { username } = req.params;

  const getUserCryptoApplicationsQuery = 'SELECT COUNT(*) AS count FROM crypto_form WHERE username = ?';

  db.query(getUserCryptoApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user crypto applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const count = results[0].count;
        res.status(200).json({ username, cryptoApplicationsCount: count });
      } else {
        res.status(404).send('User not found or no crypto applications');
      }
    }
  });
});

app.get('/api/user-credit-applications/:username', (req, res) => {
  const { username } = req.params;

  const getUserCreditApplicationsQuery = 'SELECT COUNT(*) AS count FROM credit_card_application WHERE username = ?';

  db.query(getUserCreditApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user crypto applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const count = results[0].count;
        res.status(200).json({ username, creditApplicationsCount: count });
      } else {
        res.status(404).send('User not found or no crypto applications');
      }
    }
  });
});


app.get('/api/user-credit-card-applications-details/:username', (req, res) => {
  const { username } = req.params;

  const getUserCreditCardApplicationsQuery = `
    SELECT creditcardname, DATE_FORMAT(appliedDate, '%Y-%m-%d') as appliedDate, status 
    FROM credit_card_application 
    WHERE username = ?
  `;

  db.query(getUserCreditCardApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user credit card applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).send('User not found or no credit card applications');
      }
    }
  });
});

app.get('/api/user-crypto-applications-details/:username', (req, res) => {
  const { username } = req.params;

  const getUserCryptoApplicationsQuery = `
    SELECT cryptocurrencyType, amount, DATE_FORMAT(appliedDate, '%Y-%m-%d') as appliedDate
    FROM crypto_form
    WHERE username = ?
  `;

  db.query(getUserCryptoApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user cryptocurrency applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).send('User not found or no cryptocurrency applications');
      }
    }
  });
});

app.get('/api/user-loan-applications-details/:username', (req, res) => {
  const { username } = req.params;

  const getUserLoanApplicationsQuery = `
    SELECT loanAmount, loanRepaymentPeriod, interestRate , DATE_FORMAT(appliedDate, '%Y-%m-%d') as appliedDate
    FROM personal_loan 
    WHERE username = ?
  `;

  db.query(getUserLoanApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user loan applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).send('User not found or no loan applications');
      }
    }
  });
});

app.get('/api/user-loan-applications/:username', (req, res) => {
  const { username } = req.params;

  const getUserLoanApplicationsQuery = 'SELECT COUNT(*) AS count FROM personal_loan WHERE username = ?';

  db.query(getUserLoanApplicationsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user loan applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const count = results[0].count;
        res.status(200).json({ username, loanApplicationsCount: count });
      } else {
        res.status(404).send('User not found or no loan applications');
      }
    }
  });
});

/*
For admin
 */

app.get('/api/get-all-users', (req, res) => {
  const getUsersQuery = `
    SELECT firstName, lastName, username, DATE_FORMAT(dob, '%Y-%m-%d') as dob, email FROM users
  `;

  db.query(getUsersQuery, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/get-all-loans', (req, res) => {
  const getLoansQuery = `
    SELECT * FROM personal_loan
  `;

  db.query(getLoansQuery, (err, results) => {
    if (err) {
      console.error('Error fetching loans:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/get-all-credit-cards', (req, res) => {
  const getCreditCardsQuery = `
    SELECT * FROM credit_card_application
  `;

  db.query(getCreditCardsQuery, (err, results) => {
    if (err) {
      console.error('Error fetching credit cards:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/get-all-crypto', (req, res) => {
  const getCryptoQuery = `
    SELECT * FROM crypto_form
  `;

  db.query(getCryptoQuery, (err, results) => {
    if (err) {
      console.error('Error fetching crypto applications:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });
});

/*
*/

const mongoose = require("mongoose");
const port_mongo = 3001;

mongoose.connect("mongodb://localhost:27017/fintech", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for the review
const reviewSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String,
});

const Review = mongoose.model("Review", reviewSchema);

app.post("/api/reviews", async (req, res) => {
  try {
    // Create a new review instance using the data from the request body
    const newReview = new Review({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
    });

    // Save the review to the database
    await newReview.save();

    // Send a success response
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add a new endpoint to fetch reviews
app.get("/api/getReviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port_mongo, () => {
  console.log(`Server is running on port ${port_mongo}`);
});

