// VideoUploadComponent.tsx

import React, { useState } from 'react';
import { Spinner } from './spinner.tsx';

import './upload-video-tab.css';


interface VideoUploadProps {
  siteUrl: string; // SharePoint site URL
}

const UploadVideo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(`file name ${file?.name}`);
    if (file) {
      setSelectedFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    setUploadingFile(true);

    try {
      const uploadUrl = `https://flashcastsfhlcontainers.azurewebsites.net/api/Videos/upload`;// api
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Upload the file using fetch or any other HTTP library
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      setUploadingFile(false);
      setSelectedFile(null);
      setSelectedFileName("");
      if (response.ok) {
        console.log('Video uploaded successfully!');
        // Handle success (e.g., show a success message)
      } else {
        console.error('Error uploading video:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred during upload:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className='div-upload'>
      <label className="choose-file-button-container" htmlFor="file-upload">
        <input id="file-upload" className='choose-file-button' type="file" accept="video/*" onChange={handleFileChange} />
        Choose an mp4
      </label>
      <button className='upload-video-button' onClick={handleUpload}>Upload</button>
      <div>Selected file: {selectedFileName}</div>
      {uploadingFile && <Spinner/>}
    </div>
  );
};

export { UploadVideo };
