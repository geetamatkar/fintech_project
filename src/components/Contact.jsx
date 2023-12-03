import React, { useEffect , useState } from 'react';
import styles from '../style';


const Contact = () => {
  const [userPin, setUserPin] = useState('');
  const [userCoordinates, setUserCoordinates] = useState(null);

    //const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const googleMapsApiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    console.log(import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', e.target.emailContent.value);
      };

      const handlePincodeChange = (e) => {
        setUserPin(e.target.value);
      };
    
      const handlePincodeSubmit = (e) => {
        e.preventDefault();
    
        // Use Google Geocoding API to convert pin code to coordinates
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userPin}&${googleMapsApiKey}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              const { lat, lng } = data.results[0].geometry.location;
              setUserCoordinates({ lat, lng });
            } else {
              // Handle error when pin code does not return valid coordinates
              console.error('Invalid pin code or unable to retrieve coordinates.');
            }
          })
          .catch((error) => {
            console.error('Error fetching coordinates:', error);
          });
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

    /*window.initMap = () => {
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
      ];*/

      const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: userCoordinates || { lat: 41.83499, lng: -87.62704 }, // Default to a location if user's coordinates are not available
          zoom: 6,
        });
  
      /*
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.83499, lng: -87.62704 },
        zoom: 6,
      });*/

      // Create markers for each location
      /*locations.forEach((location, index) => {
        new window.google.maps.Marker({
          position: location,
          map,
          title: `Location ${index + 1}`,
        });
      });*/

      if (userCoordinates) {
        // Show marker for user's location
        new window.google.maps.Marker({
          position: userCoordinates,
          map,
          title: 'Your Location',
        });

        // You can add logic to find nearby locations based on userCoordinates
        // For example:
        const nearbyLocations = [
          // Define nearby locations based on user's coordinates
          // This can be fetched from an API or a predefined list
          { lat: userCoordinates.lat + 0.1, lng: userCoordinates.lng + 0.1 },
          { lat: userCoordinates.lat - 0.1, lng: userCoordinates.lng - 0.1 },
          // Add more nearby locations as needed
        ];

        // Create markers for nearby locations
        nearbyLocations.forEach((location, index) => {
          new window.google.maps.Marker({
            position: location,
            map,
            title: `Nearby Location ${index + 1}`,
          });
        });
      }
    
    };

    loadGoogleMapsScript();
  }, [userCoordinates]);


  return (

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
     
      

      {/* */}

      <form onSubmit={handlePincodeSubmit} className="mt-8">
        <h3 className="text-white m-3">Find Locations Near You</h3>
        <label htmlFor="pincode" className="text-white m-3">
          Enter your pin code:
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={userPin}
          onChange={handlePincodeChange}
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 w-2/3 m-3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 m-3 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Find Locations
        </button>
      </form>

      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
      </div>
    
  </div>
  );
};

export default Contact;