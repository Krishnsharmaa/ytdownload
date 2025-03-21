const express = require("express");
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/videoinfo', async (req, res) => {
    const { url } = req.query;
    console.log("Received URL:", url);

    if (!url) {
        return res.status(400).json({ message: "Error: Invalid video URL" });
    }

    try {
        const videoInfo = await ytdl.getInfo(url);
        console.log("Fetched Video Title:", videoInfo.videoDetails.title);

        const formats = videoInfo.formats
            .filter((format) => format.container === "mp4")
            .map(format => ({
                quality: format.qualityLabel,
                url: format.url,
                itag: format.itag,
            }));

        res.json({
            title: videoInfo.videoDetails.title,
            thumbnail: videoInfo.videoDetails.thumbnails.pop().url,
            formats,
        });

    } catch (error) {
        console.error("Error fetching video details:", error);
        res.status(500).json({ error: "Failed to fetch video details", details: error.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("App server started on port", port);
});
