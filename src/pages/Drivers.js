import React from 'react'
import { useRef } from 'react';
import Driver from '../components/Driver';

const Drivers = () => {
    const scrollRef = useRef(null);

    const handleScroll = (event) => {
        event.preventDefault();
        scrollRef.current.scrollLeft += event.deltaY;
    };
    return (
        <div className='p-6 mt-2'>
            <h1 className='text-white font-bold text-5xl mb-6'>Drivers</h1>
            <div
                ref={scrollRef}
                onWheel={handleScroll}
                className="w-full overflow-x-auto flex space-x-4 scrollbar-hide"
            >
                <Driver powerStr={"550 GH/s"} power={0.00000000000115} costStr={"4.99"} nameStr={"Cloud Drive #1"}/>
                <Driver powerStr={"2.65 TH/s"} power={0.000000000005544} costStr={"17.99"} nameStr={"Cloud Drive #2"}/>
                <Driver powerStr={"12.00 TH/s"} power={0.000000000027776} costStr={"59.99"} nameStr={"Cloud Drive #3"}/>
                <Driver powerStr={"60.00 TH/s"} power={0.000000000138880} costStr={"179.99"} nameStr={"Cloud Drive #4"}/>
                <Driver powerStr={"250 TH/s"} power={0.000000000694400} costStr={"499.99"} nameStr={"Cloud Drive #5"}/>
                <Driver powerStr={"750 TH/s"} power={0.000000002083200} costStr={"999.99"} nameStr={"Cloud Drive #6"} />
                <Driver powerStr={"3.50 PH/s"} power={0.000000010416000} costStr={"2499.99"} nameStr={"Cloud Drive #7"}/>
            </div>
        </div>
    )
}

export default Drivers
