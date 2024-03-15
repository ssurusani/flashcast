// VideoUploadComponent.tsx

import React, { useState } from 'react';

import './upload-video-tab.css'

interface VideoUploadProps {
  siteUrl: string; // SharePoint site URL
}

const UploadVideo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    try {
      const uploadUrl = `$/_api/web/lists/getbytitle('Videos')/RootFolder/Files/Add(url='${selectedFile.name}', overwrite=true)`;// api

      // Upload the file using fetch or any other HTTP library
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: selectedFile,
        headers: {
          'Accept': 'application/json',
          'X-RequestDigest': 'your-request-digest', // Obtain this from SharePoint
        },
      });

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
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button className='upload-video-button' onClick={handleUpload}>Upload Video</button>
    </div>
  );
};

export { UploadVideo };
