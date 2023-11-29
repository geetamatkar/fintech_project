import React, { useEffect , useState } from 'react';
import styles from '../style';

const Contact = () => {

    //const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const googleMapsApiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    console.log(import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., sending email) goes here
        // You might use an API call or a backend service to send the email
        // For now, let's log the form data to the console
        console.log('Form submitted:', e.target.emailContent.value);
      };


  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMapsScript = () => {
       
        if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzHKLQPg2XBB_2nfWmcl0MEzaYesitNzU&callback=initMap`;
      //script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.defer = true;
      //
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } 
    else {
        initMap();
      }
    };

    window.initMap = () => {
      // Initialize Google Maps
      const locations = [
        { lat: 40.7128, lng: -74.006 },
        { lat: 34.0522, lng: -118.2437 },
        { lat: 41.83499, lng: -87.62704 },
        { lat: 41.87924, lng: -87.64227 },
        { lat: 41.76291, lng: -88.14240 },
        { lat: 39.125554, lng: -84.53485 },
        { lat: 39.81927, lng: -89.61977 },
        // Add more locations as needed
      ];

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.83499, lng: -87.62704 },
        zoom: 6,
      });

      // Create markers for each location
      locations.forEach((location, index) => {
        new window.google.maps.Marker({
          position: location,
          map,
          title: `Location ${index + 1}`,
        });
      });
    };

    loadGoogleMapsScript();
  }, []);


  return (
    /*
    <div className="flex">
      <div className="w-1/2">
        <h2 className="text-white">Our Organization: Quantum Vault</h2>
        <p className="text-white">Contact Number: +11234567890</p>
        <p className="text-white">Email: info@quantumvault.com</p>
      </div>
      <div className="w-1/2" style={{ height: '400px', marginTop: '20px' }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
    */

    <div className={`flex ${styles.paddingY}`}> {/* Apply padding style */}
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
    <div className="text-white">
        <h2 className="text-3xl font-bold mb-4">Our Organization: Quantum Vault</h2>
        <p className="text-lg">Contact us at: +11234567890</p>
        <p className="text-lg">Email: info@quantumvault.com</p>
        </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <h3 className="text-white mb-2">Any queries?</h3>
        <label htmlFor="emailContent" className="text-white">
          Write your message:
        </label>
        <textarea
          id="emailContent"
          name="emailContent"
          rows="4"
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send
        </button>
      </form>

    </div>
    <div className={`flex-1 ${styles.flexCenter} ${styles.marginY}`}> 
     
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
      </div>
    
  </div>
  );
};

export default Contact;
