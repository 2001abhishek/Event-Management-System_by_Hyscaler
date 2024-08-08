import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { eventName } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  const goBack = () =>{
    navigate('/');



  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${eventName}/users`)
      .then((response) => {
        setUsers(response.data);
        

      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, [eventName, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Registered for {eventName}</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600">First Name</th>
            <th className="py-3 px-4 text-left text-gray-600">Last Name</th>
            <th className="py-3 px-4 text-left text-gray-600">DOB</th>
            <th className="py-3 px-4 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-gray-600">Phone Number</th>
            <th className="py-3 px-4 text-left text-gray-600">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="py-2 px-4 text-gray-800">{user.first_name}</td>
              <td className="py-2 px-4 text-gray-800">{user.last_name}</td>
              <td className="py-2 px-4 text-gray-800">{user.dob}</td>
              <td className="py-2 px-4 text-gray-800">{user.email}</td>
              <td className="py-2 px-4 text-gray-800">{user.phone_number}</td>
              <td className="py-2 px-4 text-gray-800">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
       
      <button onClick={goBack} className= " text-black px-4 py-2 mt-4 rounded border-2 border-slate-900 font-bold hover:bg-slate-900 hover:text-white">
        Back
      </button>


    </div>
  );
};

export default EventDetails;
