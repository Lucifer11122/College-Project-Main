import React, { useState, useEffect } from "react";
import axios from "axios";

axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Response Error:', error);
  return Promise.reject(error);
});

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
  const [notice, setNotice] = useState({
    title: '',
    message: '',
    targetRole: 'all'
  });
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    type: 'undergraduate',
    description: '',
    duration: '',
    fees: '',
    criteria: '',
    image: 'cimage1.jpeg'
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCourses();
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

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting notice:', notice); // Debug log
      const response = await axios.post("http://localhost:5000/api/admin/notices", notice);
      console.log('Notice response:', response.data); // Debug log
      
      if (response.data.notice) {
        setNotice({ title: '', message: '', targetRole: 'all' });
        alert("Notice sent successfully!");
      }
    } catch (error) {
      console.error("Error sending notice:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send notice");
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting course:', newCourse); // Debug log
      const response = await axios.post('http://localhost:5000/api/admin/courses', newCourse);
      console.log('Course response:', response.data); // Debug log
      
      if (response.data.course) {
        setNewCourse({
          title: '',
          type: 'undergraduate',
          description: '',
          duration: '',
          fees: '',
          criteria: '',
          image: 'cimage1.jpeg'
        });
        fetchCourses();
        alert('Course added successfully!');
      }
    } catch (error) {
      console.error('Error adding course:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to add course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/courses/${courseId}`);
        fetchCourses();
        alert('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
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

      {/* Notice Management Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Send Notice</h2>
        <form onSubmit={handleNoticeSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Notice Title"
              value={notice.title}
              onChange={(e) => setNotice({ ...notice, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <textarea
              placeholder="Notice Message"
              value={notice.message}
              onChange={(e) => setNotice({ ...notice, message: e.target.value })}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          
          <div>
            <select
              value={notice.targetRole}
              onChange={(e) => setNotice({ ...notice, targetRole: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Users</option>
              <option value="teacher">Teachers Only</option>
              <option value="student">Students Only</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Notice
          </button>
        </form>
      </div>

      {/* Course Management Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
        <form onSubmit={handleCourseSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <select
              value={newCourse.type}
              onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          <div>
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Duration (e.g., 3 years)"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Fees"
              value={newCourse.fees}
              onChange={(e) => setNewCourse({ ...newCourse, fees: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Eligibility Criteria"
              value={newCourse.criteria}
              onChange={(e) => setNewCourse({ ...newCourse, criteria: e.target.value })}
              className="w-full p-2 border rounded h-20"
              required
            />
          </div>

          <div>
            <select
              value={newCourse.image}
              onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="cimage1.jpeg">Image 1</option>
              <option value="cimage2.jpeg">Image 2</option>
              <option value="cimage3.jpeg">Image 3</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Course
          </button>
        </form>

        {/* Display Current Courses */}
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Current Courses</h3>
          {courses.map((course) => (
            <div key={course._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.type}</p>
                <p className="text-sm text-gray-600">Fees: {course.fees}</p>
              </div>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;