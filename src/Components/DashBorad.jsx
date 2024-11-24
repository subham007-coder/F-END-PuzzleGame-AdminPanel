import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://puzzle-game-backend-a7gf.onrender.com';

const Dashboard = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  // const [topAlbums, setTopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const handleDeleteClick = (song) => {
    setSongToDelete(song);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`https://puzzle-game-backend-a7gf.onrender.com/api/songs/${songToDelete._id}`);
      
      if (response.status === 200) {
        setRecentSongs(prevSongs => prevSongs.filter(song => song._id !== songToDelete._id));
        toast.success('Song deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error('Failed to delete song');
    } finally {
      setIsDeleteModalOpen(false);
      setSongToDelete(null);
    }
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const songsResponse = await axios.get(`${API_URL}/api/songs`);
        setRecentSongs(songsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Failed to fetch songs. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 ml-0">
      {/* Main Container */}
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          {/* <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search songs, albums..."
                className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Songs</h3>
            <p className="text-3xl font-bold">{recentSongs.length}</p>
          </div>
          <div className="bg-blue-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Albums</h3>
            <p className="text-3xl font-bold">{recentSongs.length}</p>
          </div>
          <div className="bg-pink-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Cards</h3>
            <p className="text-3xl font-bold">{recentSongs.length*2}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Songs */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  All Songs
                </h2>
                {loading ? (
                  <p className="dark:text-white">Loading songs...</p>
                ) : (
                  <div className="space-y-4">
                    {recentSongs.map((song, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition duration-150"
                      >
                        <img
                          src={`https://puzzle-game-backend-a7gf.onrender.com/${song.image}`}
                          alt={song.title}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {song.title}
                          </h3>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(song)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Albums */}
          {/* <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Top Albums
                </h2>
                {loading ? (
                  <p>Loading albums...</p>
                ) : (
                  <div className="grid gap-4">
                    {topAlbums.map((album, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg"
                      >
                        <img
                          src={album.image}
                          alt={album.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white font-semibold">
                            {album.name}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {album.artist}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {album.songs} songs
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          
        </div>
      </div>

      {/* Add the DeleteConfirmationModal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSongToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
