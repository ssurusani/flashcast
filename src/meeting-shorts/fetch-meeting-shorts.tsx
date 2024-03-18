import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import ReactPlayer from 'react-player';
import { Link, scroller, Element } from 'react-scroll';
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
  const [scrollLeft, setScrollLeft]= useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(performance.now());
  // const playNext = () => {
  //   const nextIndex = myReelsIndex + 1
  //   if (nextIndex >= reels.length) {
  //     //setReels(reels[0])
  //     setMyReelsIndex(0)
  //   } else {
  //     //setReels(reels[nextIndex])
  //     setMyReelsIndex(nextIndex)
  //   }
  // }

    const fetchVideos = React.useCallback(async () => {
      try {

        let videoList = ['1d62733c-77df-478b-ba26-571448233037','382f1b4d-af72-4a04-b3fb-761dc6c016b5','103ec5d4-af6e-4510-b750-f725db9eed85'];
        for (const vid of videoList) {
          const response = await axios.get('https://flashcastsfhlcontainers.azurewebsites.net/api/Videos/getreels', {
            params: {
              videoId: vid,
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
            summaryReelsUrl: response.data.realsFromIndexer.map((item: any) => ({
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
      }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    },[]);

  useEffect(() => {
    fetchVideos();
  },[]);

  const options = {
    // your options here, for example:
    duration: 500,
    smooth: true,
  };

  // const handleScroll = () => {
  //   // Define your scroll threshold (e.g., 300 pixels)
  //   const scrollThreshold = 50;
  //   const currentScrollY = window.scrollY;
  //   var currentReelsIndex;
  //   var element;
  //   var rect;
  //   var top;
  //   var left;

  //   // Check if the user has scrolled beyond the threshold
  //   if (currentScrollY > scrollTop) {
  //       // Call your custom function here
  //       if (myReelsIndex < reels.length-1) {
  //         //setReels(reels[0])
  //         // setMyReelsIndex(0);
  //         setMyReelsIndex((myReelsIndex+1));
  //         //scroller.scrollTo((myReelsIndex+1).toString(), options); // Should be number or string?
  //         currentReelsIndex = myReelsIndex+1;
  //       } 
  //       else{
  //         //scroller.scrollTo(myReelsIndex.toString(), options);
  //         currentReelsIndex = myReelsIndex;
  //       }
  //       element = document.getElementById(currentReelsIndex.toString());
  //       rect = element?.getBoundingClientRect();
  //       top = rect?.top;
  //       left =rect?.left;

  //       console.log('User scrolled down', (currentScrollY), 'pixels');
  //   }
  //   else if (currentScrollY  < scrollTop){

  //     if (myReelsIndex > 0) {
  //       //setReels(reels[0])
  //       // setMyReelsIndex(0);
  //       setMyReelsIndex((myReelsIndex-1));
  //       //scroller.scrollTo((myReelsIndex-1).toString(), options); // Should be number or string?
  //       currentReelsIndex = myReelsIndex-1;
  //     }
  //     else{
  //       //scroller.scrollTo(myReelsIndex.toString(), options);
  //       currentReelsIndex = myReelsIndex;
  //     }
  //     element = document.getElementById(currentReelsIndex.toString());
  //     rect = element?.getBoundingClientRect();
  //     top = rect?.top;
  //     left =rect?.left;

  //     console.log('User scrolled up', (currentScrollY), 'pixels');
  //   }

  //   setScrollTop(top ?? 0);
  //   setScrollLeft(left ?? 0);
  //   // You can replace the console.log with your actual function
  // };

  // const handleScrollTime = () => {

  //   const timeNow = performance.now();
  //   if((timeNow-lastScrollTime)>1000){
  //     handleScroll();
  //     setLastScrollTime(performance.now());
  //   }
  // }

  // useEffect(() => {

  //   // var element = document.getElementById(myReelsIndex.toString());
  //   // var rect = element?.getBoundingClientRect();
  //   // var top = rect?.top;
  //   // setScrollYaxis(top ?? 0);

  //   window.scrollTo({top:scrollTop, left: scrollLeft, behavior: 'smooth'});
  // },[scrollLeft, scrollTop]);
  
  useEffect(() => {

  
    // const handleScroll = () => {
    //   // Define your scroll threshold (e.g., 300 pixels)
    //   const scrollThreshold = 50;
    //   const currentScrollY = window.scrollY;
    //   var currentReelsIndex;
    //   var element;
    //   var rect;
    //   var top;
    //   var left;
  
    //   // Check if the user has scrolled beyond the threshold
    //   if (currentScrollY > scrollTop) {
    //       // Call your custom function here
    //       if (myReelsIndex < reels.length-1) {
    //         //setReels(reels[0])
    //         // setMyReelsIndex(0);
    //         setMyReelsIndex((myReelsIndex+1));
    //         //scroller.scrollTo((myReelsIndex+1).toString(), options); // Should be number or string?
    //         currentReelsIndex = myReelsIndex+1;
    //       } 
    //       else{
    //         //scroller.scrollTo(myReelsIndex.toString(), options);
    //         currentReelsIndex = myReelsIndex;
    //       }
    //       element = document.getElementById(currentReelsIndex.toString());
    //       rect = element?.getBoundingClientRect();
    //       top = rect?.top;
    //       left =rect?.left;
  
    //       console.log('User scrolled down', (currentScrollY), 'pixels');
     // }
    //   else if (currentScrollY  < scrollTop){
  
    //     if (myReelsIndex > 0) {
    //       //setReels(reels[0])
    //       // setMyReelsIndex(0);
    //       setMyReelsIndex((myReelsIndex-1));
    //       //scroller.scrollTo((myReelsIndex-1).toString(), options); // Should be number or string?
    //       currentReelsIndex = myReelsIndex-1;
    //     }
    //     else{
    //       //scroller.scrollTo(myReelsIndex.toString(), options);
    //       currentReelsIndex = myReelsIndex;
    //     }
    //     element = document.getElementById(currentReelsIndex.toString());
    //     rect = element?.getBoundingClientRect();
    //     top = rect?.top;
    //     left =rect?.left;
  
    //     console.log('User scrolled up', (currentScrollY), 'pixels');
    //   }
  
    //   setScrollTop(top ?? 0);
    //   setScrollLeft(left ?? 0);
    //   // You can replace the console.log with your actual function
    // };
  
    // const handleScrollTime = () => {
  
    //   const timeNow = performance.now();
    //   if((timeNow-lastScrollTime)>1000){
    //     handleScroll();
    //     setLastScrollTime(performance.now());
    //   }
    // }

    // Attach the event listener when the component mounts
    //window.addEventListener('scrollend', handleScrollTime);
    // Clean up: Remove the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener('scrollend',  handleScrollTime);
    // };
  }, []);

  return (
    <div className='flex-container'>
      <div style={{ display: 'flex', overflowY: 'hidden', gap: 2, flexDirection:'column',alignItems:'center'}}>
        {reels.map((reel, index) => (
          // return <video key={index} src={reel.downloadUrl} width="320" height="240" controls autoPlay/>
          <div id= {index.toString()}> 
            <ReactPlayer className="react-player"
              url={reel.downloadUrl}
              controls
              //loop
              width="430px"
              height="932px"
              // onstart={() => { setMyReelsIndex(index); }}
              playing={myReelsIndex === index ? true : false}
              //onProgress={() => {}} 
              //onEnded={playNext}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { ShortsList };