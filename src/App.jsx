import styles from "./style";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Footer } from "./components";

import RegistrationForm from "./components/RegistrationForm";
import GetStarted from "./components/GetStarted";

const Home = () => (
  <div className={`${styles.boxWidth}`}>
    <Hero />
    <Stats />
    <Business />
    <Billing />
    <CardDeal />
    <Testimonials />
    <Clients />
    <CTA />
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
