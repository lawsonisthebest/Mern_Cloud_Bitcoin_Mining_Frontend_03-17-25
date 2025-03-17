import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import React from 'react'
import * as cheerio from "cheerio";

const Wallet = () => {
    const scrollRef = useRef(null);
    const [bitcoinValue, setBitcoinValue] = useState("84,421.53");
    const [bitcoin, setBitcoin] = useState(0.000000000000)
    const [money, setMoney] = useState(0.000000000000);

    useEffect(()=>{
        const fetchBitcoin = async () => {
              const token = localStorage.getItem('token');
              if (!token) {
                console.error("No token found");
                return;
              }
              try {
                const res = await axios.get("http://localhost:4000/api/", {
                  headers: {
                    'Authorization': `Bearer ${token}`, // Send token as Authorization header
                  }
                });
                setBitcoin(res.data.bitcoin.toFixed(6)); // Ensure it's a number
              } catch (error) {
                console.error("Error fetching Bitcoin:", error);
              }
            };

        fetchBitcoin();
        const interval = setInterval(() => {
            fetchBitcoin();
        }, 1000); // Runs every 1 second
    }, [bitcoin])
    
    // Calculate the money based on Bitcoin value and a constant price of $80,000
    const fetchMoney = () => {
        setMoney((bitcoin * 80000).toFixed(4));  // Update money in USD
    };

    useEffect(() => {
        fetchMoney();
    }, [bitcoin]);  // Runs when bitcoin value changes
   
    
    const handleScroll = (event) => {
        event.preventDefault();
        scrollRef.current.scrollLeft += event.deltaY;
    };
    return (
        <div
        className='p-6 mt-2 text-white'>
            <h1 className='text-white font-bold text-5xl mb-6'>Wallet</h1>
            <div ref={scrollRef}
                onWheel={handleScroll}
                className='flex gap-6 w-full overflow-x-auto space-x-4 scrollbar-hide'>
                <div className='bg-[#413b70] rounded-lg p-8 w-[min-content] '>
                    <div className='flex gap-8'>
                        <div className='flex items-center gap-2'>
                            <i class="fa-solid fa-bitcoin-sign text-2xl"></i>
                            <h3 className='font-bold text-3xl tabular-nums'>{bitcoin}</h3>
                        </div>
                        <i class="fa-solid fa-repeat text-3xl"></i>
                        <div className='flex items-center gap-2'>
                            <i class="fa-solid fa-money-bill text-2xl"></i>
                            <h3 className='font-bold text-3xl tabular-nums'>${money}</h3>
                        </div>
                    </div>
                    <button className='bg-[#4e5496] mt-6 py-[.3rem] w-full text-center text-xl font-bold rounded-lg'>Convert</button>
                </div>
                <div className='bg-[#413b70] rounded-lg p-8 w-[min-content] '>
                    <div className='flex-col flex gap-2'>
                        <div className='flex items-center gap-2'>
                            <i class="fa-solid fa-bitcoin-sign text-2xl"></i>
                            <h3 className='font-bold text-3xl w-[max-content]'>Market Value</h3>
                        </div>
                        <div className='flex items-center gap-1'>
                            <i class="fa-solid fa-plus text-xl"></i>
                            <h3 className='font-bold text-2xl'>{bitcoinValue}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet
