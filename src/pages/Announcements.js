import React, { useState } from 'react'
import { useRef } from 'react';
import Driver from '../components/Driver';

const Announcements = ({msg, price, name}) => {
    const scrollRef = useRef(null);

    const handleScroll = (event) => {
        event.preventDefault();
        scrollRef.current.scrollLeft += event.deltaY;
    };
    return (
        <div className='p-6 mt-2'>
            <h1 className='text-white font-bold text-5xl mb-6'>Logs</h1>
            <div
                ref={scrollRef}
                onWheel={handleScroll}
                className="w-full overflow-x-auto flex space-x-4 scrollbar-hide"
            >
                <div className='text-white text-2xl font-semibold bg-[#4a4980] p-4 rounded-lg flex gap-4 items-center'>
                    {localStorage.getItem("msg")&&<i class={`fa-regular ${localStorage.getItem("msg") ? "fa-thumbs-up" : "fa-thumbs-down"} text-2xl font-bold bg-[#6a6aa6] p-2 aspect-square w-12 text-center rounded-full`}></i>}
                    {localStorage.getItem("msg")&&<p>{localStorage.getItem("name")} {localStorage.getItem("msg") ? "was successfuly" : "failed to"} purchased for ${localStorage.getItem("price")}</p>}
                    {!localStorage.getItem("msg")&&<p>Try purchasing a driver to get started!</p>}
                </div>
            </div>
        </div>
    )
}

export default Announcements
