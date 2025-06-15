import React, { useState, useEffect } from "react";
import axios from "axios";
import Filecard from "../components/Filecard";

const Home = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3003/api/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3003/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Upload successful!");
      setFile(null);
      fetchFiles();
    } catch (err) {
      alert("Upload failed");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <input type="file" onChange={handleChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>

      <h2 className="text-xl font-semibold mt-6">My Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {files.map((file) => (
          <Filecard key={file._id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default Home;
