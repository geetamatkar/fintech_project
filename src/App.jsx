import styles from "./style";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Footer } from "./components";

import RegistrationForm from "./components/RegistrationForm";
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";
import Loan from "./components/Loan";
import HomeLoan from "./components/HomeLoan";
import PersonalLoan from "./components/PersonalLoan";
import AutoLoan from "./components/AutoLoan";
import Services from "./components/Services";
import CreditCards from "./components/Creditcards";
import LoanTypes from "./components/LoanTypes";
import Cryptocurrency from "./components/CryptoCurrency";
import CreditCardApplyForm from "./components/CreditCardApplyForm";
import Contact from "./components/Contact";
import AutocompleteSearch from "./components/AutoCompleteSearch";

const Home = () => (
  <div className={`${styles.boxWidth}`}>
    <Hero />
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
            <Route path="/loan" element={<Loan/>} />
            <Route path="/home-loan" element={<HomeLoan/>} />
            <Route path="/personal-loan" element={<PersonalLoan/>} />
            <Route path="/auto-loan" element={<AutoLoan/>} />
            <Route path="/services" element={<Services/>} /> 
            <Route path="/creditcards" element={<CreditCards/>} />
            <Route path="/loans" element={<LoanTypes/>} />
            <Route path="/cryptocurrency" element={<Cryptocurrency/>} />
            <Route path="/credit-card" element={<CreditCardApplyForm/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/AutocompleteSearch" element={<AutocompleteSearch/>} />
"
            
          </Routes>
        <Footer />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Routes>
            
          </Routes>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Routes>
            
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
