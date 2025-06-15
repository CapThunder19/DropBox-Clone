import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Filecard = ({ file }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <p className="font-semibold text-gray-800 truncate">{file.originalname}</p>
        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
      </div>
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 text-sm"
        download
      >
        <FaDownload className="mr-2" /> Download
      </a>
    </div>
  );
};

export default Filecard;
