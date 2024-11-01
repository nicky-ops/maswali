// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/quiz/leaderboard/');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Name</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {leaderboard.map((entry, index) => (
          <div key={index} className="bg-green-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{entry.username}</h2>
            <p className="text-xl font-bold">{entry.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
