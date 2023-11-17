import styles from "./style";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Footer } from "./components";

import RegistrationForm from "./components/RegistrationForm";
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";
import Services from "./components/Services";
import CreditCards from "./components/Creditcards";
import LoanTypes from "./components/LoanTypes";
import Cryptocurrency from "./components/CryptoCurrency";

const Home = () => (
  <div className={`${styles.boxWidth}`}>
    <Hero />
    <Business />
    <Billing />
    <CardDeal />
    <Testimonials />
  </div>
);
  
const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/services" element={<Services/>} /> 
            <Route path="/creditcards" element={<CreditCards/>} />
            <Route path="/loans" element={<LoanTypes/>} />
            <Route path="/cryptocurrency" element={<Cryptocurrency/>} />
            {/* Add more routes as needed */}
          </Routes>
        <Footer />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Routes>
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Routes>
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
