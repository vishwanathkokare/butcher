import React from 'react';

const Reload: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">You are offline</h2>
        <p className="mb-4">Please check your internet connection and try again.</p>
        <button
          onClick={handleReload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default Reload;