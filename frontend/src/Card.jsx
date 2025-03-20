import React, { useState } from 'react'
import './App.css';
import axios from "axios";
import {  toast } from 'react-toastify';


const Card = () => {
    const [videourl, setvideourl] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState("");
    const [loading, setLoading] = useState(false);

    const handlefetch= async () =>{
      if (!videourl.trim()) {
        toast.error("Please enter a valid URL.");
        return;
      }
  
      setLoading(true);
        try{
            //const response = await axios.get(`https://youtubevideodownloaders.onrender.com/videoinfo`, {params: {url: videourl}});
            const response = await axios.get(`http://localhost:5000/videoinfo`, {params: {url: videourl}});
           setVideoData(response.data)
          
        }
        catch(e){
         
            toast.error(e.response?.data?.error || "Something went wrong error in the axios handle fetch");
        } 
        finally {
          setLoading(false);
        }
       }
        const handledownload = () =>{
            if(!selectedQuality){
                return  toast.error(" not set quality here ");
        }
       
            window.open(`http://localhost:5000/download?url=${videourl}&itag=${selectedQuality}`);
            

            setvideourl("");
            setVideoData(null); 
            setSelectedQuality("");
            toast.success("video download in new tab")
        }


  return (
    <div className='flex flex-col justify-center items-center my-10 '>
      <h1 className='text-lime-600 font-bold italic text-2xl p-4'>YOUTUBE VIDEO DOWNLOAD TO MP4 </h1>

<div className=" h-screen flex justify-center  bg-gray-200 min-h-screen my-10 mx-4">
         <div className='border-3 border-lime-500 items-center min-w-[50px] md:min-w-[300px] md:max-w-md min-h-fit p-6 rounded-lg shadow-lg bg-white hover:border-red-500 hover:scale-100' >
           <div>
          <h1 className="text-red-500 font-bold text-3xl">Youtube Video Downloader </h1>
           </div>
           <br></br>
           <div>
            <input placeholder='Enter your link' value={videourl} onChange={(e)=>setvideourl(e.target.value)} className='rounded-md p-2 border-2 md:w-65 px-2 mx-2 '/>
            <button className='rounded-md bg-lime-500 font-bold px-3 py-2 m-4 hover:border-2 hover:bg-purple-500' onClick={handlefetch}>Fetch</button>
           </div>
           <div>

           {loading ? (
             <p className="text-green-700 font-bold m-15 text-center text-4xl">Loading...</p>
              ) : (
            videoData && (
                <div className='m-4 flex flex-col  justify-center '>
                    <br></br>
                    <img src= {videoData.thumbnail} alt='thumbnail'  className='rounded-lg w-200' />
                    
                    <h2 className='text-2xl m-3 text-lime-800 font-bold'>{videoData.title}</h2>
                    <select className='mt-2 border-2 border-blue rounded-md ' onChange={(e)=> setSelectedQuality(e.target.value)} >
                        {/* <option value="">Select quality</option>
                      {videoData.formats.map((format, index)=>(
                       <option key={index} value={format.itag} >
                        {format.quality}
                       </option> */}
                       <option value="">Select quality</option>
{videoData.formats
  .filter((format, index, arr) => 
    arr.map(f => f.quality).indexOf(format.quality) === index)  // Duplicate ko filter karo
  .map((format, index) => (
    <option key={index} value={format.itag}>
      {format.quality}
    </option>
  ))}
         </select>
                </div>
           ) )}
            
           </div>
            <div className='flex flex-row justify-center'>  
           <button className='rounded-md bg-red-500 font-bold px-3 py-2 m-4 hover:border-2 hover:bg-lime-500'onClick={handledownload} >Download</button>
           </div>
           <div className='flex flex-col'>
            <p className='text-blue-900'>Above the Content show which you want to download </p>
            <p className='font-bold '>Till 360 quality video include audio and highest quality only video not audio include </p>
            <br></br>
            <h2 className='text-fuchsia-700'>Thanks for Try the youtube Video Downloader</h2>
            <br></br>
            <h3 className='font-bold text-amber-800'>Also try please & Click below text :- </h3>
            <br></br> 
              <div className='flex flex-col justify-center items-center'>
              <div> <span className='text-2xl text-red-600 underline font-bold hover:text-blue-600 hover:decoration-dashed '><a href='https://www.youtube.com/@ErFactzone.1.12M'>My Youtube Channel</a></span>
             <br></br> <div>
             <h1 className='text-lime-600 italic text-center'>Krishna Sharma</h1>
             </div>
              </div></div>
    </div>
    </div>
    
       </div>
       
    </div>

    
   
  )
}

export default Card


