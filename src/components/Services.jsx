import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, linkTo }) => (
  <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
    <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    <div className="flex px-6 py-4 items-center justify-center">
      <Link to={linkTo} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Apply Now
      </Link>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {/* Credit Card Service */}
      <ServiceCard
        title="Credit Card"
        description="Our Credit Card service offers you a convenient way to make purchases with added benefits such as rewards and cashback. Manage your expenses wisely with our flexible credit solutions."
        linkTo="/creditcards"
      />

      {/* Loan Service */}
      <ServiceCard
        title="Loan"
        description="Need financial assistance? Our Loan service provides competitive interest rates and flexible repayment options. Achieve your goals with our hassle-free lending solutions."
        linkTo="/loans"
      />

      {/* Cryptocurrency Service */}
      <ServiceCard
        title="Cryptocurrency"
        description="Dive into the world of digital assets with our Cryptocurrency service. Explore the opportunities and potential gains of investing in cryptocurrencies. Stay ahead in the evolving financial landscape."
        linkTo="/cryptocurrency"
      />

      {/* Retirement Planning Service */}
      <ServiceCard
        title="Retirement Planning"
        description="Secure your future with our Retirement Planning service. We offer expert guidance to help you plan and invest wisely, ensuring a comfortable and stress-free retirement."
        linkTo="/apply/retirement-planning"
      />
    </div>
  );
};

export default Services;
