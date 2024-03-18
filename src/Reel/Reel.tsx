import {
    View,
    Text,
    StyleSheet,
    Pressable,
    useWindowDimensions,
  } from 'react-native';
  //import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  // import { Ionicons } from '@expo/vector-icons';
  import { FaPlay } from 'react-icons/fa';
  import PlayArrowIcon from '@mui/icons-material';
  //import { LinearGradient } from 'expo-linear-gradient';
  import { useEffect, useRef, useState } from 'react';
  import ReactPlayer from 'react-player';
  import React from 'react';
  
  type Reel = {
    reel: {
      id: string;
      url: string;
      title: string;
    };
    activePostId: string;
  };
  
  const Reel = ({ reel, activePostId }: Reel) => {
    const video = useRef<ReactPlayer>(null);
    //const [status, setStatus] = useState<AVPlaybackStatus>();
  
    const [isPlaying, setIsPlaying] = useState(reel.id === activePostId);
  
    const { height } = useWindowDimensions();
  
    // useEffect(() => {
    //   if (!video.current) {
    //     return;
    //   }
    //   if (activePostId !== reel.id) {
    //     video.current;
    //   }
    //   if (activePostId === reel.id) {
    //     video.current.playAsync();
    //   }
    // }, [activePostId, video.current]);
  
    const onPress = () => {
      if (!video.current) {
        return;
      }
      setIsPlaying(!isPlaying)
    };
  
    return (
      <View style={[styles.container, { height:932, width: 430}]}>
        <ReactPlayer
          className="react-player"
          ref={video}
          url= {reel.url}
          width="430px"
          height="932px"
          //playing={reel.id===activePostId}
          controls
          loop
        />
        {/* bottom: caption
        {!isPlaying && <View style={styles.leftColumn}>
        <Text style={styles.caption}>{reel.title}</Text>
        </View>} */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {},
    video: {},
    content: {
      flex: 1,
      padding: 10,
    },
    overlay: {
      top: '50%',
    },
    footer: {
      marginTop: 'auto',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    leftColumn: {
      flex: 1,
      marginTop: 'auto',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    caption: {
      color: 'white',
      fontFamily: 'Inter',
      fontSize: 18,
    },
    rightColumn: {
      gap: 10,
    },
  });
  
  export default Reel;