import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsQueries = ({ studentName }) => {
  const [queries, setQueries] = useState([]);
  const [question, setQuestion] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/queries');
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/queries', {
        studentName,
        question
      });
      setQuestion('');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
      fetchQueries();
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Ask Your Question</h2>
      
      {showConfirmation && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Question submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit Question
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-semibold">Your Questions & Answers</h3>
        {queries.filter(query => query.studentName === studentName).map((query, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded">
            <p className="text-gray-600 mb-2">{query.question}</p>
            {query.answer && (
              <div className="mt-2 p-2 bg-green-50 rounded">
                <p className="font-medium text-green-800">Teacher's Response:</p>
                <p className="text-gray-600">{query.answer}</p>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(query.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsQueries;
