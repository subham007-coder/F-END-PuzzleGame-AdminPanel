import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function AdminPanel() {
  const [songData, setSongData] = useState({
    title: "",
    album: "",
  });
  const [image, setImage] = useState(null);

  const [audio, setAudio] = useState(null);

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("album", songData.album);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://puzzle-game-backend-a7gf.onrender.com/api/songs/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000,
        }
      );
      toast.success('Song added successfully');
      setSongData({ title: "", album: "" });
      setImage(null);
      setAudio(null);
    } catch (error) {
      console.error("Error adding song:", error);
      let errorMessage = 'Failed to add song';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
          {/* <div>
        <input
          type="text"
          name="artist"
          value={songData.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
          className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div> */}

          {/* Album */}
          <div>
            <input
              type="text"
              name="album"
              value={songData.album}
              onChange={handleChange}
              required
              placeholder="Album"
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
              onChange={handleAudioChange}
              accept="audio/*"
              className="w-full text-white bg-slate-700 p-3 rounded-md file:bg-slate-600 file:text-white file:px-4 file:py-2 file:rounded-md focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Accepted formats: mp3, wav, flac
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Adding Song...' : 'Add Song'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AdminPanel;