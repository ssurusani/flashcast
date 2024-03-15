// src/Components/TabComponent/Tabs.tsx
import React, { useState } from 'react';
import { ShortsList } from '../meeting-shorts/fetch-meeting-shorts.tsx';
import { UploadVideo } from '../upload-video/upload-video-tab.tsx';
import { Video16Regular, Video16Filled } from '@fluentui/react-icons'
import "./tabs.css"

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // State to track active tab

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabContent: JSX.Element[] = [
    <div key={0}><ShortsList/></div>,
    //<div key={1}><UploadVideo/></div>
  ];

  const tabName: string[] = [" Shorts"];

  return (
    <div className="tab-container">
      <div id="menu">
        {tabContent.map((content, index) => (
          <button
            key={index}
            style = {{'display': 'flex'}}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <Video16Filled display={tabName[index]}/> 
            <text className="tabtext" style = {{'padding':'0.3em'}}>{tabName[index]}</text>
          </button>
        ))}
      </div>
      <div className="tab-content">{tabContent[activeTab]}</div>
    </div>
  );
};

export { TabComponent };
