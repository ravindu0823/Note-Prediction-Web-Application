import { useRef, useMemo, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { ComplexNavbar } from "../components/NavBar";
import { Button, Radio } from "@material-tailwind/react";
import { CantHelpFallingInLove } from "../assets/audio";
import axios, { ANALYZE_CHORDS, ANALYZE_NOTES } from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Predict = () => {
  const containerRef = useRef();
  const [file, setFile] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const random = (min, max) => Math.random() * (max - min) + min;
  const [selectedMethod, setSelectedMethod] = useState(0); // State variable for selected radio button

  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  // Create a region
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

  // Create a region marker
  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: CantHelpFallingInLove,
    waveColor: "green",
    progressColor: "purple",
    autoScroll: true,
    scrollParent: true,
    minPxPerSec: 100,
    height: 100,
    plugins: useMemo(() => [Timeline.create(), RegionsPlugin.create()], []),
  });

  // Add region marker when axios request is successful
  const addRegionMarkerLive = (chords) => {
    console.log("This is the chords", chords);
    const regions = wavesurfer.registerPlugin(RegionsPlugin.create());

    chords.forEach((region) => {
      regions.addRegion(createRegion(region.start, region.end, region.note));
    });
  };

  // Function to play and pause audio
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  // Function to stop audio
  const onStop = () => {
    wavesurfer && wavesurfer.stop();
  };

  /* useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on("ready", () => {
        // wavesurfer.play();
        addRegionMarker();
      });
    }
  }, [isReady, wavesurfer]); */

  // Function to handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  // Function to handle radio button change
  const handleMethodChange = (e) => {
    setSelectedMethod(parseInt(e.target.value)); // Convert value to integer
  };

  // Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;

    if (selectedMethod === 0) {
      const response = await axios.post(
        `${ANALYZE_CHORDS}/${userId}`,
        formData
      );

      // TODO: NEED TO REMAKE THIS
      if (response.status != 201) {
        console.log("Error");
        return;
      }

      console.log(response.data);
      const { chords } = response.data;

      const fileURL = URL.createObjectURL(file);

      if (wavesurfer && file) {
        wavesurfer.load(fileURL);
        wavesurfer.on("ready", () => {
          // wavesurfer.play();
          addRegionMarkerLive(chords);
          console.log("done");
          setIsComplete(true);
        });
      }
    }

    if (selectedMethod === 1) {
      const response = await axios.post(`${ANALYZE_NOTES}/${userId}`, formData);

      // TODO: NEED TO REMAKE THIS
      if (response.status != 201) {
        console.log("Error");
        return;
      }

      console.log(response.data);
      const { notes } = response.data;

      const fileURL = URL.createObjectURL(file);

      if (wavesurfer && file) {
        wavesurfer.load(fileURL);
        wavesurfer.on("ready", () => {
          // wavesurfer.play();
          addRegionMarkerLive(notes);
          console.log("done");
          setIsComplete(true);
        });
      }
    }
  };

  return (
    <>
      <div>
        <ComplexNavbar className="mx-auto max-w-screen-xl p-7" />

        <div className="flex items-center justify-center p-12">
          <div className="border border-black rounded-2xl mx-auto w-full max-w-[550px] bg-white">
            <form className="py-6 px-9" onSubmit={handleSubmit}>
              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload Audio File
                </label>

                <div className="flex items-center justify-center w-full mb-8">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Limit: 1 File
                      </p>
                      {file && (
                        <h2 className="text-gray-500 dark:text-gray-400 pt-5">
                          {file.name}
                        </h2>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-center gap-10 mx-auto mb-5">
                <Radio
                  name="method"
                  label="Chords Only"
                  value={0}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 0} // Check if this radio button is selected
                />
                <Radio
                  name="method"
                  label="Notes Only"
                  value={1}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 1} // Check if this radio button is selected
                />
                <Radio
                  name="method"
                  label="Both"
                  value={2}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 2} // Check if this radio button is selected
                />
              </div>

              <div>
                <Button
                  className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  type="submit"
                  disabled={file == null ? true : false}
                >
                  Send File
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`mx-auto max-w-screen-2xl ${
            isComplete ? `block` : `hidden`
          }`}
        >
          <div>Chord Data</div>
          <div ref={containerRef} className="mt-10" />

          <Button onClick={onPlayPause} color="blue" className="m-5">
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <Button onClick={onStop} color="red">
            {isPlaying ? "Stop" : "Stop"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Predict;
