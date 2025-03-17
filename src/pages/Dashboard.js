import React from 'react'
import Drivers from './Drivers';
import NavBar from '../components/NavBar';
import Wallet from './Wallet';
import Announcements from './Announcements';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Drivers/>
      <Wallet />
      <Announcements/>
    </div>
  )
}

export default Dashboard
