'use client';

import { AuthProvider, useAuth } from '../utils/AuthProvider';

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
        {/* Display user's email */}
        {authUser && <p>User name: {authUser.email}</p>}{' '}
        <button onClick={signOut}>Log Out</button> {/* Logout button */}
      </main>
    </>
  );
}
