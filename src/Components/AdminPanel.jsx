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

  // Change the API URL to localhost
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate files
    if (!image || !audio) {
      toast.error('Both image and audio files are required');
      return;
    }
  
    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("album", songData.album);
    formData.append("image", image);
    formData.append("audio", audio);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/songs/add",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      );
      
      if (response.data) {
        toast.success('Song added successfully');
        setSongData({ title: "", album: "" });
        setImage(null);
        setAudio(null);
        
        // Reset file inputs
        document.getElementById('image-upload').value = '';
        document.getElementById('audio-upload').value = '';
      }
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error(error.response?.data?.message || 'Failed to add song');
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AdminPanel;