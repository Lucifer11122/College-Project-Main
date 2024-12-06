import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { protect } from './middleware/authMiddleware.js';
import dotenv from "dotenv";
import dashboardRoutes from './routes/dashboardRoutes.js';
import Query from './models/Query.js';
import User from './models/User.js';
import Class from './models/Class.js';
import Notice from './models/Notice.js';
import Course from './models/Course.js';

dotenv.config();
const app = express();
const port = 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Store notifications in memory (or you can use MongoDB)
let notifications = [
  "Welcome to the new semester!",
  "Admissions are open for 2024",
  "Don't miss the upcoming seminar"
];

let grievances = [];  

// Get all notifications
app.get("/notifications", (req, res) => {
  res.json(notifications);
});

// Add a new notification
app.post("/notifications", (req, res) => {
  const { notification } = req.body;
  if (notification && typeof notification === "string" && notification.trim() !== "") {
    notifications.push(notification.trim());
    res.status(201).json({ 
      message: "Notification added successfully!",
      notifications 
    });
  } else {
    res.status(400).json({ message: "Invalid notification format!" });
  }
});

// Delete a notification
app.delete("/notifications/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < notifications.length) {
    notifications.splice(index, 1);
    res.json({ 
      message: "Notification deleted successfully!",
      notifications 
    });
  } else {
    res.status(404).json({ message: "Notification not found!" });
  }
});

// Get all grievances (for admin to view)
app.get("/grievances", (req, res) => {
  res.json(grievances);
});

// Add a new grievance (for users)
app.post("/grievances", (req, res) => {
  const { complaint, username, role } = req.body;
  if (complaint && typeof complaint === "string" && complaint.trim() !== "") {
    grievances.push({ complaint, username, role, date: new Date() });
    res.status(201).json({ message: "Grievance submitted successfully!" });
  } else {
    res.status(400).json({ message: "Invalid grievance format!" });
  }
});

// Delete a grievance by index (for admin)
app.delete("/grievances/:index", (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < grievances.length) {
    grievances.splice(index, 1); 
    res.json({ message: "Grievance deleted successfully!" });
  } else {
    res.status(400).json({ message: "Invalid grievance index!" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/api', dashboardRoutes);

// Get all queries
app.get("/api/queries", async (req, res) => {
  try {
    const queries = await Query.find().sort({ date: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching queries" });
  }
});

// Submit a new query
app.post("/api/queries", async (req, res) => {
  try {
    const { studentName, question } = req.body;
    const newQuery = new Query({ studentName, question });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting query" });
  }
});

// Answer a query
app.post("/api/queries/:queryId/answer", async (req, res) => {
  try {
    const { answer } = req.body;
    await Query.findByIdAndUpdate(req.params.queryId, {
      answer,
      isAnswered: true
    });
    res.json({ message: "Answer submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting answer" });
  }
});

// Admin routes for class management
app.get("/api/admin/teachers", async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
});

app.get("/api/admin/students", async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/api/admin/classes", async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacher', 'firstName lastName')
      .populate('students', 'firstName lastName');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes" });
  }
});

app.post("/api/admin/classes", async (req, res) => {
  try {
    const { name, teacher, students } = req.body;
    const newClass = new Class({ name, teacher, students });
    await newClass.save();
    res.status(201).json({ message: "Class created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating class" });
  }
});

// Add a route to get classes assigned to a teacher
app.get("/api/teacher/classes", protect, async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id })
      .populate('students', 'firstName lastName');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes for teacher" });
  }
});

// Add a route to get classes a student is enrolled in
app.get("/api/student/classes", protect, async (req, res) => {
  try {
    const classes = await Class.find({ students: req.user._id })
      .populate('teacher', 'firstName lastName');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes for student" });
  }
});

app.post("/api/admin/notices", async (req, res) => {
  try {
    const { title, message, targetRole } = req.body;
    
    // Validate required fields
    if (!title || !message || !targetRole) {
      return res.status(400).json({ 
        message: "Title, message and target role are required" 
      });
    }

    const newNotice = new Notice({ 
      title, 
      message, 
      targetRole 
    });

    await newNotice.save();
    console.log('Notice saved:', newNotice); // Debug log

    res.status(201).json({ 
      message: "Notice sent successfully",
      notice: newNotice 
    });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ 
      message: "Error sending notice",
      error: error.message 
    });
  }
});

app.get("/api/notices/:role", async (req, res) => {
  try {
    const { role } = req.params;
    const notices = await Notice.find({
      $or: [{ targetRole: 'all' }, { targetRole: role }]
    }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
});

app.get("/api/admin/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

app.post("/api/admin/courses", async (req, res) => {
  try {
    const { title, type, description, duration, fees, criteria } = req.body;
    
    // Validate required fields
    if (!title || !type || !duration || !fees || !criteria) {
      return res.status(400).json({ 
        message: "All fields except description are required" 
      });
    }

    const newCourse = new Course({
      title,
      type,
      description: description || '',
      duration,
      fees,
      criteria,
      image: 'cimage1.jpeg' // Default image
    });

    await newCourse.save();
    console.log('Course saved:', newCourse); // Debug log

    res.status(201).json({ 
      message: "Course created successfully",
      course: newCourse 
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ 
      message: "Error creating course",
      error: error.message 
    });
  }
});

app.delete("/api/admin/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
});

app.get("/api/courses/:type", async (req, res) => {
  try {
    const courses = await Course.find({ type: req.params.type });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


