 
const express = require("express");
const cors = require('cors');
const ytdl = require('@distube/ytdl-core'); 


const app = express();
app.use(cors());
   
app.use(express.json());

app.get('/videoinfo', async (req , res) =>{
   const {url} = req.query;
   console.log(url)

if(!url){
    return res.status(201).json({message:" error in the url of video "})
}
try{
   const  videoInfo = await  ytdl.getInfo(url);
   console.log(videoInfo.videoDetails.title)
    const formats = videoInfo.formats
    .filter((format)=> format.container === "mp4"  )
    .map(format=>({
        quality: format.qualityLabel,
        url: format.url,
        itag: format.itag,
       
    }
))
    res.json({
        title: videoInfo.videoDetails.title,
        thumbnail: videoInfo.videoDetails.thumbnails.pop().url,
        formats,
    });

   
}catch(error){
    res.status(500).json({ error: "Failed to fetch video details" });
}
})
app.get("/download", async (req, res )=>{
    const {url , itag, } = req.query;
    if(!url || !itag){
       res.json({message: " not hava url and the itag "})
    }
    try{
        
       res.header("Content-Disposition", 'attachment; filename="video.mp4"');
     
       ytdl(url, { filter: (format) => format.itag == itag }).pipe(res, { end: true });




    }
    catch(error){
      return  res.json({message: "error in download"});

    }
   })

app.get('/home2', (req, res)=>{
    res.send("hello i am root go video download from youtube url to /videoinfo")
})
const port = 5000;

app.listen(port , () =>{
    console.log("app server started now " , port)
})