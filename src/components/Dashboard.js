import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const Dashboard = ({ signOut, user }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const response = await fetch('http://localhost:8000/user-permission', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setRows(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to Dashboard, {user.username}</h1>
      <button
        onClick={async () => {
          try {
            await Auth.signOut({ global: true });
            window.location.href = '/';
                    } catch (error) {
            console.error("Error signing out:", error);
          }
        }}
      >
        Sign out
      </button>

      <h2>Data From Backend:</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Load Data"}
      </button>

      <ul>
        {rows.map((row) => (
          <li key={row.id}>{row.name} ({row.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
