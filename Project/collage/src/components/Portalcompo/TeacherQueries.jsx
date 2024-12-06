import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherQueries = () => {
  const [queries, setQueries] = useState([]);
  const [answers, setAnswers] = useState({});
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchQueries();
    fetchNotices();
    const interval = setInterval(fetchQueries, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/queries');
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notices/teacher');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleAnswer = async (queryId) => {
    try {
      await axios.post(`http://localhost:5000/api/queries/${queryId}/answer`, {
        answer: answers[queryId]
      });
      setAnswers(prev => ({ ...prev, [queryId]: '' }));
      fetchQueries();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Important Notices</h2>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice._id} className="p-4 bg-orange-50 rounded border-l-4 border-orange-500">
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <p className="text-gray-600 mt-1">{notice.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Student Questions</h2>
      <div className="space-y-4">
        {queries.length === 0 ? (
          <p className="text-gray-500">No questions from students yet.</p>
        ) : (
          queries.map((query) => (
            <div key={query._id} className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">From: {query.studentName}</p>
              <p className="text-gray-600 mb-2">{query.question}</p>
              {!query.isAnswered ? (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Write your answer..."
                    value={answers[query._id] || ''}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      [query._id]: e.target.value
                    }))}
                  />
                  <button
                    onClick={() => handleAnswer(query._id)}
                    className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-green-50 rounded">
                  <p className="font-medium text-green-800">Your Answer:</p>
                  <p className="text-gray-600">{query.answer}</p>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Posted: {new Date(query.date).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherQueries; 