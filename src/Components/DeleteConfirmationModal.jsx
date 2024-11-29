import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting, progress }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Confirm Delete
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this song? This action cannot be undone.
        </p>

         {/* Progress Bar */}
         {isDeleting && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-700">
              <div
                className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Deleting... {progress}%
            </p>
          </div>
        )}

<div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-md ${
              isDeleting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300'
            } text-gray-800`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-md ${
              isDeleting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;