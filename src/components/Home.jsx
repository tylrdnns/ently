import { Card, Timeline, Typography, Carousel, Button } from "antd";
import React, { useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import NFTTokenIds from "./NFTTokenIds";
import { Player, BigPlayButton, ControlBar } from 'video-react';
import VideoPlayer from 'react-video-js-player';

const { Meta } = Card;
const { Text } = Typography;

const styles = {
  
};

export default function Home({ isServerInfo }) {
  const { Moralis } = useMoralis();
  const [show, setShow] = useState(false)

  return (
    <div style={styles.page}>
      <VideoPlayer
        src="https://ipfs.io/ipfs/QmVhFwye3T97jbN3K71zYdN4asnvMHVyrQ79a26TXqaSbn?filename=01-FREE-WILL.mp4"/>
    </div>
  );
}