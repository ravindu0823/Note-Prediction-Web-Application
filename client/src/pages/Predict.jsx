import { useRef, useEffect } from "react";
import audioFile from "../assets/audio/audio.mp3";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const Predict = () => {
  const containerRef = useRef();
  const random = (min, max) => Math.random() * (max - min) + min;
  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  const addRegionMarker = () => {
    const regions = wavesurfer.registerPlugin(RegionsPlugin.create());

    regions.addRegion({
      start: 0,
      end: 8,
      content: "Resize me",
      color: randomColor(),
      drag: false,
      resize: true,
    });
  };

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioFile,
    waveColor: "purple",
    height: 100,
    onReady: addRegionMarker, // Call addRegionMarker when the audio file is loaded
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <>
      <div ref={containerRef} />

      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </>
  );
};

export default Predict;
