import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [bitcoin, setBitcoin] = useState(0.000000000000);
  const [drivers, setDrivers] = useState(0.000000000000);
  const navigate = useNavigate();

  // Fetch Drivers and Bitcoin from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        // Fetch Drivers
        const driversRes = await axios.get("https://mern-cloud-bitcoin-mining-backend.onrender.com/api/drivers", {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          }
        });
        setDrivers(driversRes.data.drivers);
        console.log("Drivers fetched: ", driversRes.data.drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }

      try {
        // Fetch Bitcoin balance
        const bitcoinRes = await axios.get("https://mern-cloud-bitcoin-mining-backend.onrender.com/api/", {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          }
        });
        setBitcoin(parseFloat(bitcoinRes.data.bitcoin).toFixed(12)); // Ensure it's a number
      } catch (error) {
        console.error("Error fetching Bitcoin:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  // Update Bitcoin balance every second, based on drivers
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return; // Exit if no token

      axios.patch("https://mern-cloud-bitcoin-mining-backend.onrender.com/api/", { incrementAmount: drivers }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in the Authorization header
        }
      })
      .then((res) => {
        setBitcoin(parseFloat(res.data.bitcoin).toFixed(12)); // Update UI with new value
      })
      .catch((error) => console.error("Error updating Bitcoin:", error));
    }, 1000); // Runs every 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [drivers]); // Runs when `drivers` change

  // Handle increment for drivers (simulating the mining process)
  const addIncrement = (increment) => {
    setDrivers(prev => (parseFloat(prev) + increment).toFixed(12)); // Ensures numeric addition
    console.log("Drivers updated:", drivers);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="w-full p-6 text-white bg-[#413b70] flex justify-between">
      <div className="flex gap-10">
        <button onClick={() => navigate("/")} className="font-semibold text-2xl flex items-center gap-3">
          <i className="fa-solid fa-gauge"></i> Dashboard
        </button>
        <button onClick={() => {
          if (localStorage.getItem('token')) {
            handleLogout();
          } else {
            navigate("/login");
          }
        }} className="font-semibold text-2xl flex items-center gap-3">
          <i className="fa-solid fa-user"></i> {!localStorage.getItem('token') ? "Account" : "Logout"}
        </button>
      </div>
      <div className='flex items-center gap-1'>
        <i className="fa-solid fa-bitcoin-sign text-xl"></i>
        <h1 className="font-semibold text-2xl tabular-nums">
          {localStorage.getItem('token') ? bitcoin : bitcoin.toFixed(12)}
        </h1>
      </div>
    </div>
  );
};

export default NavBar;
