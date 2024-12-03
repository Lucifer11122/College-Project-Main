import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grievance from './Portalcompo/Grievance';
import TeacherQueries from './Portalcompo/TeacherQueries';

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user-profile');
      return;
    }

    const fetchTeacherData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teacher/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeacherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        if (error.response?.status === 401) {
          navigate('/user-profile');
        }
      }
    };

    fetchTeacherData();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {teacherData?.firstName} {teacherData?.lastName}</p>
              <p><span className="font-medium">Email:</span> {teacherData?.email}</p>
              <p><span className="font-medium">Department:</span> {teacherData?.department}</p>
            </div>
          </div>

          {/* Classes Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Classes</h2>
            <div className="space-y-2">
              {teacherData?.classes?.map((cls, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.schedule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-2">
              {teacherData?.notifications?.map((notification, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          <TeacherQueries />
          <Grievance role="teacher" />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
