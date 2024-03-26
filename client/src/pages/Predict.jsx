import { useRef, useEffect, useMemo } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { ComplexNavbar } from "../components/NavBar";
import { Button } from "@material-tailwind/react";
import {
  FinalCountDownLabData,
  ThousandYearsLabData,
} from "../utils/TestLabData";
import { finalCountDownAudio, thousandYearsAudio } from "../assets/audio";

const Predict = () => {
  const containerRef = useRef();
  const random = (min, max) => Math.random() * (max - min) + min;
  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  const createRegion = (start, end, content) => {
    return {
      start,
      end,
      content,
      color: randomColor(),
      drag: false,
      resize: false,
    };
  };

  const addRegionMarker = () => {
    const regions = wavesurfer.registerPlugin(RegionsPlugin.create());

    ThousandYearsLabData.chords.forEach((region) => {
      regions.addRegion(createRegion(region.start, region.end, region.note));
    });
  };

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: thousandYearsAudio,
    waveColor: "green",
    progressColor: "purple",
    // autoScroll: true,
    scrollParent: true,
    minPxPerSec: 100,
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

  return (
    <>
      <div>
        <ComplexNavbar className="mx-auto max-w-screen-xl p-7" />
        <div ref={containerRef} className="mt-10" />

        <Button onClick={onPlayPause} color="blue" className="m-2">
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <button onClick={addRegionMarker}>Add Region</button>
      </div>
    </>
  );
};

export default Predict;
