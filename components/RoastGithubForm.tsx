// components/HoaxReportForm.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';

interface ResponseData {
  message: string;
  data?: any;
  error?: any;
}

const RoastGithubForm: React.FC = () => {
  const [target, setTarget] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const sendReport = async (username: string) => {
    try {
      const response = await axios.get(`https://fastrestapis.fasturl.cloud/ai/roasting/github?username=${username}`);
      return response.data.data.roasting;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const roasting = await sendReport(target);
      setResponseData({ message: 'Yahaha kena roasting', data: roasting });
      setShowPopup(true);
    } catch (error) {
      setResponseData({
        message: 'Error occurred while sending the report.',
        error
      });
      setShowPopup(true);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
    setTarget('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700">
            Target
          </label>
          <input
            type="text"
            id="target"
            name="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan Target Github"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Roasting Gass!
        </button>
      </form>
      {loading && (
        <div className="mt-4 flex justify-center">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.964 7.964 0 014 12H2c0 2.042.768 3.897 2.043 5.317l1.957-1.026z"></path>
          </svg>
        </div>
      )}
      {showPopup && (
        <div className={`mt-4 p-4 rounded-md ${responseData?.error ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          <div>{responseData?.message}</div>
          {responseData?.data && <div className="mt-2">{responseData.data}</div>}
          {responseData?.error && (
            <div className="mt-2 text-red-500">
              {typeof responseData.error === 'string'
                ? responseData.error
                : JSON.stringify(responseData.error, null, 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoastGithubForm;
