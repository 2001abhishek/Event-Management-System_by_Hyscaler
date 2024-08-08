import React from 'react';
import { Link } from 'react-router-dom';

const events = [
  { name: 'Friday Night', thumbnail: ' pexels-vikeph-25361605.jpg' },
  { name: 'Birthday Celebration', thumbnail: 'pexels-marinautrabo-1729797.jpg' },
  { name: 'Product Presentation', thumbnail: 'https://www.shutterstock.com/image-photo/motivational-speaker-headset-performing-on-600nw-2191246753.jpg' },
];

const EventList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[50vh]">

      {events.map((event) => (
        <div key={event.name} className="relative rounded-lg shadow-xl hover:-translate-y-3 transition-all">
          <div className="relative">
            <img
              src={event.thumbnail}
              alt={event.name}
              className="w-full h-[50vh] object-cover rounded-lg"
            />
            <div className=" absolute top-1/2  text-4xl ml-2 font-bold text-white text-center z-10">{event.name}</div>
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between space-x-2">
              <Link to="/register" state={{ eventName: event.name }}>
                <button className=" text-white px-4 py-2 rounded border-2 border-slate-300 font-bold hover:bg-slate-300 hover:text-black">Register</button>
              </Link>
              <Link to={`/event/${event.name}/users`}>
                <button className=" text-white px-4 py-2 rounded border-2 border-slate-300 font-bold hover:bg-slate-300 hover:text-black">View Users</button>
              </Link>
            </div>
          </div>
          {/* <h2 className="text-xl font-bold text-white mb-2">{event.name}</h2> */}
        </div>


      ))}
    </div>
  );
};

export default EventList;
