import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Card = () => {
  const [videourl, setvideourl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [loading, setLoading] = useState(false);

  const handlefetch = async () => {
    if (!videourl.trim()) {
      toast.error('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('https://ytdownload-lwuf.onrender.com/videoinfo', {
        params: { url: videourl },
      });
      setVideoData(response.data);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Something went wrong while fetching video details.');
    } finally {
      setLoading(false);
    }
  };

  const handledownload = () => {
    if (!selectedQuality) {
      toast.error('Please select a video quality before downloading.');
      return;
    }

    window.open(
      `https://ytdownload-lwuf.onrender.com/download?url=${encodeURIComponent(videourl)}&itag=${selectedQuality}`
    );

    setvideourl('');
    setVideoData(null);
    setSelectedQuality('');
    toast.success('Video will download in a new tab.');
  };

  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='text-lime-600 font-bold italic text-2xl p-4'>YOUTUBE VIDEO DOWNLOAD TO MP4</h1>

      <div className='h-screen flex justify-center bg-gray-200 min-h-screen my-10 mx-4'>
        <div className='border-3 border-lime-500 items-center min-w-[50px] md:min-w-[300px] md:max-w-md min-h-fit p-6 rounded-lg shadow-lg bg-white hover:border-red-500 hover:scale-100'>
          <h1 className='text-red-500 font-bold text-3xl'>YouTube Video Downloader</h1>

          <div className='mt-4'>
            <input
              placeholder='Enter your link'
              value={videourl}
              onChange={(e) => setvideourl(e.target.value)}
              className='rounded-md p-2 border-2 md:w-65 px-2 mx-2'
            />
            <button
              className='rounded-md bg-lime-500 font-bold px-3 py-2 m-4 hover:border-2 hover:bg-purple-500'
              onClick={handlefetch}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch'}
            </button>
          </div>

          {loading && <p className='text-green-700 font-bold text-center text-4xl'>Loading...</p>}

          {videoData && (
            <div className='m-4 flex flex-col justify-center'>
              <img src={videoData.thumbnail} alt='Thumbnail' className='rounded-lg w-200' />
              <h2 className='text-2xl m-3 text-lime-800 font-bold'>{videoData.title}</h2>

              <select
                className='mt-2 border-2 border-blue rounded-md'
                onChange={(e) => setSelectedQuality(e.target.value)}
                value={selectedQuality}
              >
                <option value=''>Select quality</option>
                {videoData.formats
                  .filter((format, index, arr) => arr.findIndex(f => f.quality === format.quality) === index)
                  .map((format, index) => (
                    <option key={index} value={format.itag}>
                      {format.quality}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className='flex flex-row justify-center mt-4'>
            <button
              className='rounded-md bg-red-500 font-bold px-3 py-2 m-4 hover:border-2 hover:bg-lime-500'
              onClick={handledownload}
              disabled={!selectedQuality}
            >
              Download
            </button>
          </div>

          <div className='flex flex-col text-center mt-6'>
            <p className='text-blue-900'>Above content shows the video you want to download.</p>
            <p className='font-bold'>
              Till 360p quality includes audio, while higher quality may only include video.
            </p>
            <h2 className='text-fuchsia-700 mt-2'>Thanks for trying YouTube Video Downloader</h2>

            <h3 className='font-bold text-amber-800 mt-4'>Also, check out my YouTube channel:</h3>
            <a
              href='https://www.youtube.com/@ErFactzone.1.12M'
              className='text-2xl text-red-600 underline font-bold hover:text-blue-600 hover:decoration-dashed'
            >
              My YouTube Channel
            </a>

            <h1 className='text-lime-600 italic mt-2'>Krishna Sharma</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
