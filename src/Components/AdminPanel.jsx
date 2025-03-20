import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import config from "../../config";


function AdminPanel() {
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    category: "",
    language: ""
  });
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  // Change the API URL to localhost
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!image || !audio || !songData.title || !songData.artist || 
        !songData.album || !songData.category || !songData.language) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("artist", songData.artist);
    formData.append("album", songData.album);
    formData.append("category", songData.category);
    formData.append("language", songData.language);
    formData.append("image", image);
    formData.append("audio", audio);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await axios.post(
        `${config.API_URL}/songs/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` // Add token to headers
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      if (response.data) {
        setUploadProgress(100); // Set to 100% when complete
        toast.success('Song added successfully');

        // Reset form after a short delay
        setTimeout(() => {
          setSongData({ title: "", artist: "", album: "", category: "", language: "" });
          setImage(null);
          setAudio(null);
          setIsUploading(false);
          setUploadProgress(0);

          // Reset file inputs
          document.getElementById('image-upload').value = '';
          document.getElementById('audio-upload').value = '';
        }, 500); // Half second delay to show 100%
      }
    } catch (error) {
      console.error("Error adding song:", error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        // Optional: Redirect to login
        window.location.href = '/login';
      } else {
        toast.error(error.response?.data?.message || 'Failed to add song');
      }
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-slate-900 w-full h-screen flex items-center justify-center text-white">

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Add New Song
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Song Title */}
          <div>
            <input
              type="text"
              name="title"
              value={songData.title}
              onChange={handleChange}
              placeholder="Song Title"
              required
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Artist */}
          <div>
            <input
              type="text"
              name="artist"
              value={songData.artist}
              onChange={handleChange}
              placeholder="Artist Name"
              required
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Album */}
          <div>
            <input
              type="text"
              name="album"
              value={songData.album}
              onChange={handleChange}
              required
              placeholder="Album Name"
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Category */}
          <div>
            <input
              type="text"
              name="category"
              value={songData.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Language */}
          <div>
            <input
              type="text"
              name="language"
              value={songData.language}
              onChange={handleChange}
              placeholder="Language"
              required
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm text-sky-500 mb-2"
            >
              Upload an Image <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"  // Make sure this matches
              required
              onChange={handleFileChange}
              accept="image/*"
              className="w-full text-white bg-slate-700 p-3 rounded-md file:bg-slate-600 file:text-white file:px-4 file:py-2 file:rounded-md focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Accepted formats: jpg, png, jpeg
            </p>
          </div>

          {/* Audio Upload */}
          <div>
            <label
              htmlFor="audio-upload"
              className="block text-sm text-sky-500 mb-2"
            >
              Upload Audio File <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="audio-upload"
              required
              name="audio"  // Make sure this matches
              onChange={handleAudioChange}
              accept="audio/*"
              className="w-full text-white bg-slate-700 p-3 rounded-md file:bg-slate-600 file:text-white file:px-4 file:py-2 file:rounded-md focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Accepted formats: mp3, wav, flac
            </p>
          </div>


          {/* Progress Bar */}
          {isUploading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-sky-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center text-gray-400 mt-2">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isUploading}
              className={`${isUploading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-700'
                } text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200`}
            >
              {isUploading ? 'Uploading...' : 'Add Song'}
            </button>
          </div>

        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default AdminPanel;