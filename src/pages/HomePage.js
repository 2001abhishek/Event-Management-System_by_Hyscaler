import React from 'react';
import EventList from '../components/EventList';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-8">Register For the Event</h1>
      <EventList />
    </div>
  );
};

export default HomePage;
