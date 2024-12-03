import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grievance from './Portalcompo/Grievance';
import StudentsQueries from './Portalcompo/StudentsQueries';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user-profile');
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        if (error.response?.status === 401) {
          navigate('/user-profile');
        }
      }
    };

    fetchStudentData();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
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
              <p><span className="font-medium">Name:</span> {studentData?.firstName} {studentData?.lastName}</p>
              <p><span className="font-medium">Email:</span> {studentData?.email}</p>
              <p><span className="font-medium">Course:</span> {studentData?.course}</p>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <div className="space-y-2">
              {studentData?.courses?.map((course, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-2">
              {studentData?.notifications?.map((notification, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          <StudentsQueries 
            studentId={studentData?._id}
            studentName={`${studentData?.firstName} ${studentData?.lastName}`}
          />
          <Grievance role="student" />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;