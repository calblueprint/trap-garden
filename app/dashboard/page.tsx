'use client';

import { AuthProvider, useAuth } from '../utils/AuthProvider'; // Ensure the path is correct

export default function DashboardPage() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

function Dashboard() {
  const { authUser, isLoggedIn, signOut } = useAuth();

  if (!authUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>

      <main>
        <p>User is currently: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
        {authUser && <p>User name: {authUser.email}</p>}{' '}
        {/* Display user's email */}
        <button onClick={signOut}>Log Out</button> {/* Logout button */}
      </main>
    </>
  );
}
