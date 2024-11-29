import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]); // Add this state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const [deleteProgress, setDeleteProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (song) => {
    setSongToDelete(song);
    setIsDeleteModalOpen(true);
  };

  // Update handleDeleteConfirm
  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      setDeleteProgress(0);

      // Simulate progress since delete operation is usually quick
      const progressInterval = setInterval(() => {
        setDeleteProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await axios.delete(
        `${config.API_URL}/songs/${songToDelete._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setDeleteProgress(100);
        setRecentSongs(prevSongs =>
          prevSongs.filter(song => song._id !== songToDelete._id)
        );
        toast.success('Song deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error('Failed to delete song');
    } finally {
      setIsDeleting(false);
      setDeleteProgress(0);
      setIsDeleteModalOpen(false);
      setSongToDelete(null);
    }
  };

  // Update useEffect for fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const songsResponse = await axios.get(`${config.API_URL}/songs`, {
          withCredentials: true
        });
        setRecentSongs(songsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Failed to fetch songs');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (recentSongs.length > 0) {
      const albumMap = recentSongs.reduce((acc, song) => {
        if (!acc[song.album]) {
          acc[song.album] = {
            name: song.album,
            image: song.image,
            songs: []
          };
        }
        acc[song.album].songs.push(song);
        return acc;
      }, {});
      setAlbums(Object.values(albumMap));
    }
  }, [recentSongs]);


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
            <p className="text-3xl font-bold">{recentSongs.length * 2}</p>
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
                          src={song.image}
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
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(song)}
                            className="text-white hover:text-zinc-400"
                          >
                            <FontAwesomeIcon icon={faTrash} />
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
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Top Albums
                </h2>
                {loading ? (
                  <p className="dark:text-white">Loading albums...</p>
                ) : (
                  <div className="grid gap-4">
                    {albums.map((album, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg"
                      >
                        <img
                          src={album.image}
                          alt={album.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                            e.target.onerror = null;
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white font-semibold">
                            {album.name}
                          </h3>
                          {/* Expandable song list */}
                          <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-32">
                            <div className="pt-2 space-y-1">
                              {album.songs.map((song, idx) => (
                                <div key={idx} className="flex items-center text-gray-300 text-xs">
                                  <span className="w-4">{idx + 1}.</span>
                                  <p className="truncate flex-1">{song.title}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Add the DeleteConfirmationModal */}


      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteModalOpen(false);
            setSongToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        progress={deleteProgress}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;