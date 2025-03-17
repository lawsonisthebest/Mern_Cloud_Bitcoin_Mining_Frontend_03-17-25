import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Driver = (props) => {
    const index = props.index;

    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

    const openModal = () => setIsModalOpen(true);  // Function to open the modal
    const closeModal = () => setIsModalOpen(false);  // Function to close the modal

    const updateDrivers = async() =>{
        const token = localStorage.getItem('token');
        axios
            .patch("http://localhost:4000/api/drivers", { incrementAmount: props.power },
            {
                headers: {
                'Authorization': `Bearer ${token}`, // Send token in the Authorization header
                }
            }
            ) // Send number
            .then((res) => {
                setIsModalOpen(false);
                if(res.status == "200"){
                    localStorage.setItem("msg", true);
                }else{
                    localStorage.setItem("msg", false);
                }
                localStorage.setItem("price", props.costStr);
                localStorage.setItem("name", props.nameStr);

                window.location.reload();
            })
            .catch((error) => console.error("Error updating Bitcoin:", error));
    }

    return (
        <div>
            <div className="w-48 p-4 rounded-lg h-48 bg-[#363a6b] text-white flex-shrink-0 flex flex-col justify-between">
                <div>
                    <h1 className='font-semibold text-3xl'>
                        {props.powerStr}
                    </h1>

                    <h3 className='text-2xl mt-1'>
                        ${props.costStr}
                    </h3>
                </div>
                <div>
                    <button onClick={openModal} className='bg-[#4e5496] p-1 w-full text-center text-xl font-bold rounded-lg z-20'>Purchase</button>
                </div>
            </div>
            {isModalOpen && (
                <>
                    {/* Background Overlay with blur effect */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

                    {/* Modal */}
                    <div className="absolute p-8 rounded-lg bg-[#4a4980] flex flex-col justify-center items-center text-white max-w-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <h2 className='text-3xl font-bold text-center mb-4'>Do you wish to continue with this purchase: {props.nameStr} ?</h2>
                        <div className='flex items-center justify-center flex-col gap-2 my-2'>
                            <p className='text-2xl'>+{props.powerStr}</p>
                            <p className='text-2xl'>-${props.costStr}</p>
                        </div>
                        <div className='flex gap-6 mt-6 text-xl'>
                            <button className="bg-blue-600 p-1 rounded-md px-8" onClick={updateDrivers}>Confirm</button>
                            <button className="bg-red-500 p-1 rounded-md px-8" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Driver
