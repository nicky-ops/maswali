import React from 'react';
import Leaderboard from './Leaderboard';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Homepage</h1>
      <Leaderboard />
    </div>
  );
};

export default HomePage;