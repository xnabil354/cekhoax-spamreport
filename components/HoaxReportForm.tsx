// components/HoaxReportForm.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';

interface ResponseData {
  message: string;
  data?: any;
  error?: any;
}

const HoaxReportForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const sendReport = async (description: string) => {
    try {
      const response = await axios.post('https://backend.cekhoax.id/api/hoax_report/create', {
        source: 'website',
        email: email,
        description: description
      }, {
        headers: {
          'X-Authorization': 'bK6q6pS5zeNQvkxXPniVoRzGYp5Z4VwUrOCpcA8G8ffNYouYQ04CujQ8KLvhnQRD',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (let i = 0; i < count; i++) { 
      const randomDescription = generateRandomString(); 
      try {
        const data = await sendReport(randomDescription);
        setResponseData({ message: `Laporan ke-${i + 1} berhasil dikirim.`, data });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } catch (error) {
        setResponseData({ message: `Error pada laporan ke-${i + 1}`, error });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    }

    setEmail('');
    setCount(1); 
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (Opsional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan email Anda"
          />
        </div>
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700">
            Jumlah Laporan
          </label>
          <input
            type="number"
            id="count"
            name="count"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value)))} // Pastikan count minimal 1
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Kirim Laporan
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50">
          {responseData?.message}
          {responseData?.data && <pre>{JSON.stringify(responseData.data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
};

export default HoaxReportForm;
