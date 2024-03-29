import { useState, useEffect } from 'react'
import Dropzone from '../components/Dropzone'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

export default function Detect() {

  const [file, setFile] = useState([])
  const [videos, setVideos] = useState([]);

  const onFileSelected = (newFiles) => {
    setFile(newFiles)
  }

  const handleVideoSubmit = async (event) => {
    event.preventDefault();

    if (file.length == 0) {
      const myStr = 'Please select a video file.'
      // <ErrorMessage errorMessage={myStr}/>
      console.error('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('video', file[0]);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video uploaded successfully:', response.data);
      // Handle successful upload (e.g., clear form, display success message)
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle upload errors (e.g., display error message)
    }
  };
  
  useEffect(() => {
    // Handle dropped files when they change
    if (file.length > 0) {
      const newVideos = file.map((file) =>
        URL.createObjectURL(file) // Create temporary URL for video preview
      );
      setVideos(newVideos);
    }
    // Revoke previously created URLs when unmounted
    return () => {
      videos.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [file]);
 
  // console.log(file[0])
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center ">
      <div>
        <h2 className="text-center font-bold text-3xl my-4">Upload Your Video</h2>
        <p className='text-center'>
          We support MP4 video format.
        </p>
      </div>
      <div className='flex flex-col justify-center items-center h-60 w-full border-2 border-dashed my-8 rounded'>
        <Dropzone onFileSelected={onFileSelected}/>
      </div>
      <div className="w-full">
        <button className="w-full py-2 px-4 mt-4 bg-primary text-white rounded cursor-pointer hover:shadow-boxshadowcolor" onClick={handleVideoSubmit}>Upload</button>
      </div>
      {/* {videos.map((videoUrl, index) => (
      <video key={index} src={videoUrl} controls />
      ))} */}
      </div>
    </div>
  )
}