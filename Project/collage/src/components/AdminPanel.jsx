import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    students: []
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const [notificationsRes, grievancesRes, usersRes, teachersRes, studentsRes, classesRes] = await Promise.all([
        axios.get("http://localhost:5000/notifications"),
        fetch("http://localhost:5000/grievances"),
        fetch("http://localhost:5000/api/admin/users/new"),
        axios.get("http://localhost:5000/api/admin/teachers"),
        axios.get("http://localhost:5000/api/admin/students"),
        axios.get("http://localhost:5000/api/admin/classes")
      ]);

      setNotifications(notificationsRes.data);
      
      if (grievancesRes.ok && usersRes.ok) {
        setGrievances(await grievancesRes.json());
        setNewUsers(await usersRes.json());
        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
        setClasses(classesRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new notification
  const handleAddNotification = async () => {
    if (!newNotification.trim()) {
      alert("Please enter a valid notification.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/notifications", {
        notification: newNotification
      });
      
      // Clear input and refresh notifications
      setNewNotification("");
      fetchData();
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Failed to add notification.");
    }
  };

  // Delete a notification
  const handleDeleteNotification = async (index) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await axios.delete(`http://localhost:5000/notifications/${index}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting notification:", error);
        alert("Failed to delete notification.");
      }
    }
  };

  // Delete a grievance
  const handleDeleteGrievance = async (index) => {
    if (window.confirm("Are you sure you want to delete this grievance?")) {
      try {
        const response = await fetch(`http://localhost:5000/grievances/${index}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          fetchData(); // Refresh the grievances list
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete grievance.");
      }
    }
  };

  // Create a new class
  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/classes", newClass);
      setNewClass({ name: '', teacher: '', students: [] });
      fetchData();
      alert("Class created successfully!");
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Failed to create class");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>

      {/* Notification Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manage Notifications</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter new notification"
          />
          <button
            onClick={handleAddNotification}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        
        {/* Display Notifications */}
        <div className="mt-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications available</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((notif, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="flex-1">{notif}</span>
                  <button
                    onClick={() => handleDeleteNotification(index)}
                    className="ml-4 text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Grievance Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manage Grievances</h2>
        <ul className="space-y-3">
          {grievances.map((grievance, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">
                  User: {grievance.username}
                </span>
                <span className="mt-1">
                  {grievance.complaint}
                </span>
                <span className="text-sm text-gray-500">
                  Submitted on: {new Date(grievance.date).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDeleteGrievance(index)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* New Users Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">New User Registrations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {newUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'student' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.profileSetup ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {user.profileSetup ? 'Profile Complete' : 'Pending Setup'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Management Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Class Management</h2>
        
        {/* Create New Class Form */}
        <form onSubmit={handleCreateClass} className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Class Name"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <select
              value={newClass.teacher}
              onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              multiple
              value={newClass.students}
              onChange={(e) => setNewClass({
                ...newClass,
                students: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="w-full p-2 border rounded"
              required
            >
              {students.map(student => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple students</p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Class
          </button>
        </form>

        {/* Classes List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Current Classes</h3>
          {classes.map((cls) => (
            <div key={cls._id} className="p-4 border rounded">
              <h4 className="font-medium">{cls.name}</h4>
              <p>Teacher: {cls.teacher.firstName} {cls.teacher.lastName}</p>
              <p>Students: {cls.students.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;