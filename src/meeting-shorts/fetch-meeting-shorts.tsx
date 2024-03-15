import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import ReactPlayer from 'react-player';
import { Player, BigPlayButton } from 'video-react';
import './fetch-meetingshorts.css'


interface reel {
  downloadUrl: string;
  reelTitle: string;
}

interface Video {
  videoId: string;
  videoState: string;
  combinedReelUrl: reel;
  summaryReelsUrl: reel[];
}

const ShortsList: React.FC = () => {
  const [reels, setReels] = useState<reel[]>([]);
  const [myReelsIndex, setMyReelsIndex] = useState(0);

  const playNext = () => {
    const nextIndex = myReelsIndex + 1
    if (nextIndex >= reels.length) {
      //setReels(reels[0])
      setMyReelsIndex(0)
    } else {
      //setReels(reels[nextIndex])
      setMyReelsIndex(nextIndex)
    }
  }

  useEffect(() => { setMyReelsIndex(0) })

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('https://flashcastsfhlcontainers.azurewebsites.net/api/Videos/getreels', {
          params: {
            videoId: '1d62733c-77df-478b-ba26-571448233037',
          },
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Accept': 'text/plain',
          }
        });
        const shortsData = {
          videoId: response.data.videoId,
          videoState: response.data.videoState,
          combinedReelUrl: {
            downloadUrl: response.data.combinedReelUrl.downloadUrl,
            reelTitle: response.data.combinedReelUrl.reelTitle,
          },
          summaryReelsUrl: response.data.summaryReelsUrl.map((item: any) => ({
            downloadUrl: item.downloadUrl,
            reelTitle: item.reelTitle,
          })),
        };
        // const shortsData = {
        //     id: shortsTestData.videoId,
        //     videoState: shortsTestData.videoState,
        //     combinedReelUrl:shortsTestData.combinedReelUrl as reel,
        //     summaryReelsUrl: shortsTestData.summaryReelsUrl as reel[],
        // };
        setReels([...shortsData.summaryReelsUrl, shortsData.combinedReelUrl]);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className='flex-container'>
      <div style={{ display: 'flex', overflowY: 'hidden', gap: 16 }}>
        {reels.map((reel, index) => (
          // return <video key={index} src={reel.downloadUrl} width="320" height="240" controls autoPlay/>
          <ReactPlayer className="react-player"
            url={reel.downloadUrl}
            controls
            width="200px"
            height="340px"
            onstart={() => { setMyReelsIndex(index + 1) }}
            playing={myReelsIndex === index ? true : false}
            onEnded={playNext}
          />
        ))}
      </div>
    </div>
  );
};

export { ShortsList };