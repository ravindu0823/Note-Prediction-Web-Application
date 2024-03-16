import { useRef, useEffect, useMemo } from "react";
import audioFile from "../assets/audio/audio.mp3";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

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

    regions.addRegion({
      start: 10,
      end: 20,
      content: "Resize me",
      color: randomColor(),
      drag: false,
      resize: true,
    });
  };

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioFile,
    waveColor: "green",
    height: 100,
    plugins: useMemo(() => [Timeline.create(), RegionsPlugin.create()], []),
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on("ready", () => {
        wavesurfer.play();
        addRegionMarker();
      });
    }
  }, [isReady, wavesurfer]);

  /* wavesurfer.on("decode", () => {
    console.log("Audio decoded");
  }) */

  return (
    <>
      <div ref={containerRef} />

      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>

      <button onClick={addRegionMarker}>Add Region</button>
    </>
  );
};

export default Predict;
