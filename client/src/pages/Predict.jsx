import { useRef, useMemo, useState, useContext } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { ComplexNavbar } from "../components/NavBar";
import { Button, Radio, Typography } from "@material-tailwind/react";
import { CantHelpFallingInLove } from "../assets/audio";
import axios, {
  ANALYZE_BOTH,
  ANALYZE_CHORDS,
  ANALYZE_NOTES,
} from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { SignInContext } from "../contexts/SignInContext";
import { useNavigate } from "react-router-dom";
import { ReactToast } from "../utils/ReactToast";

const Predict = () => {
  const { loggedIn } = useContext(SignInContext);
  const containerRefForChords = useRef();
  const containerRefForNotes = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isChordsComplete, setIsChordsComplete] = useState(false);
  const [isNotesComplete, setIsNotesComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const random = (min, max) => Math.random() * (max - min) + min;
  const [selectedMethod, setSelectedMethod] = useState(0); // State variable for selected radio button

  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  if (!loggedIn) {
    ReactToast("Please login to continue", "error");
    navigate("/login");
  }

  // Create a region marker function
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

  // Create the wavesurfer instance for Chords
  const { wavesurfer: wavesurferForChords, isPlaying: isPlayingForChords } =
    useWavesurfer({
      container: containerRefForChords,
      url: CantHelpFallingInLove,
      waveColor: "green",
      progressColor: "purple",
      autoScroll: true,
      scrollParent: true,
      minPxPerSec: 100,
      height: 100,
      plugins: useMemo(() => [Timeline.create(), RegionsPlugin.create()], []),
    });

  // Create the wavesurfer instance for Notes
  const { wavesurfer: wavesurferForNotes, isPlaying: isPlayingForNotes } =
    useWavesurfer({
      container: containerRefForNotes,
      url: CantHelpFallingInLove,
      waveColor: "green",
      progressColor: "purple",
      autoScroll: true,
      scrollParent: true,
      minPxPerSec: 100,
      height: 100,
      plugins: useMemo(() => [Timeline.create(), RegionsPlugin.create()], []),
    });

  // Register the regions plugin for Chords
  const chordsRegions =
    wavesurferForChords &&
    wavesurferForChords.registerPlugin(RegionsPlugin.create());

  // Register the regions plugin for Notes
  const notesRegions =
    wavesurferForNotes &&
    wavesurferForNotes.registerPlugin(RegionsPlugin.create());

  // Add region marker for Chords
  const addChordsRegionMarkers = (chords) => {
    console.log("This is the chords", chords);

    chords.forEach((region) => {
      chordsRegions.addRegion(
        createRegion(region.start, region.end, region.note)
      );
    });
  };

  // Add region marker for Notes
  const addNotesRegionMarkers = (notes) => {
    console.log("This is the notes", notes);

    notes.forEach((region) => {
      notesRegions.addRegion(
        createRegion(region.start, region.end, region.note)
      );
    });
  };

  // Function to play and pause audio of Chords
  const onPlayPauseChords = () => {
    wavesurferForChords && wavesurferForChords.playPause();
  };

  // Function to play and pause audio of Notes
  const onPlayPauseNotes = () => {
    wavesurferForNotes && wavesurferForNotes.playPause();
  };

  // Function to stop audio of Chords
  const onStopChords = () => {
    wavesurferForChords && wavesurferForChords.stop();
  };

  // Function to stop audio of Notes
  const onStopNotes = () => {
    wavesurferForNotes && wavesurferForNotes.stop();
  };

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
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;

    // Predict Chords
    if (selectedMethod === 0) {
      const response = await axios.post(
        `${ANALYZE_CHORDS}/${userId}`,
        formData
      );

      if (response.status != 201) {
        console.log("Error");
        return;
      }

      console.log(response.data);
      const { chords } = response.data;

      const fileURL = URL.createObjectURL(file);

      if (wavesurferForChords && file) {
        wavesurferForChords.load(fileURL);
        wavesurferForChords.on("ready", () => {
          // wavesurfer.play();
          addChordsRegionMarkers(chords);
          console.log("done");
          setIsChordsComplete(true);
          setIsLoading(false);
        });
      }
    }

    // Predict Notes
    if (selectedMethod === 1) {
      const response = await axios.post(`${ANALYZE_NOTES}/${userId}`, formData);

      if (response.status != 201) {
        console.log("Error");
        return;
      }

      console.log(response.data);
      const { notes } = response.data;

      const fileURL = URL.createObjectURL(file);

      if (wavesurferForNotes && file) {
        wavesurferForNotes.load(fileURL);
        wavesurferForNotes.on("ready", () => {
          // wavesurfer.play();
          addNotesRegionMarkers(notes);
          console.log("done");
          setIsNotesComplete(true);
          setIsLoading(false);
        });
      }
    }

    // Predict Both notes and Chords
    if (selectedMethod === 2) {
      const response = await axios.post(`${ANALYZE_BOTH}/${userId}`, formData);

      if (response.status != 201) {
        console.log("Error");
        return;
      }

      console.log(response.data);
      const { chords, notes } = response.data;

      const fileURL = URL.createObjectURL(file);

      if (wavesurferForChords && wavesurferForNotes && file) {
        wavesurferForChords.load(fileURL);
        wavesurferForChords.on("ready", () => {
          // wavesurfer.play();
          addChordsRegionMarkers(chords);
          console.log("done");
          setIsChordsComplete(true);
          setIsLoading(false);
        });

        wavesurferForNotes.load(fileURL);
        wavesurferForNotes.on("ready", () => {
          // wavesurfer.play();
          addNotesRegionMarkers(notes);
          console.log("done");
          setIsNotesComplete(true);
          setIsLoading(false);
        });
      }
    }
  };

  return (
    <>
      <div className="bg-predict-bg-image h-full bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
        <ComplexNavbar className="mx-auto max-w-screen-xl p-7" />
        <Typography
          variant="h1"
          className="text-white text-center font-bold text-3xl"
        >
          Let{"'"}s Predict Some Music
        </Typography>
        <div className="flex items-center justify-center p-12">
          <div className="border border-blue-500 rounded-2xl mx-auto w-full max-w-[550px] bg-[#111827]">
            <form className="py-6 px-9" onSubmit={handleSubmit}>
              <div className="mb-6 pt-4">
                <Typography
                  variant="lead"
                  className="mb-5 block text-xl font-semibold text-white"
                >
                  Upload Audio File
                </Typography>

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
                        MP3, WAV, FLAC, OGG, M4A, AAC, AMR, WMA
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
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
                  color="light-blue"
                  labelProps={{ className: "text-white" }}
                  value={0}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 0} // Check if this radio button is selected
                />
                <Radio
                  name="method"
                  label="Notes Only"
                  color="light-blue"
                  labelProps={{ className: "text-white" }}
                  value={1}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 1} // Check if this radio button is selected
                />
                <Radio
                  name="method"
                  label="Both"
                  color="light-blue"
                  labelProps={{ className: "text-white" }}
                  value={2}
                  onChange={handleMethodChange}
                  checked={selectedMethod === 2} // Check if this radio button is selected
                />
              </div>

              <div>
                <Button
                  className="hover:shadow-form rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  type="submit"
                  color="light-blue"
                  disabled={file == null ? true : false || isLoading}
                  loading={isLoading}
                  fullWidth
                >
                  Upload File
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`mx-auto max-w-screen-2xl bg-white border border-white ${
            isChordsComplete ? `block` : `hidden`
          }`}
        >
          <div>Chord Data</div>
          <div ref={containerRefForChords} className="mt-10" />

          <Button onClick={onPlayPauseChords} color="blue" className="m-5">
            {isPlayingForChords ? "Pause" : "Play"}
          </Button>

          <Button onClick={onStopChords} color="red">
            {isPlayingForChords ? "Stop" : "Stop"}
          </Button>
        </div>

        <div
          className={`mx-auto max-w-screen-2xl bg-white border border-white ${
            isNotesComplete ? `block` : `hidden`
          }`}
        >
          <div>Notation Data</div>
          <div ref={containerRefForNotes} className="mt-10" />

          <Button onClick={onPlayPauseNotes} color="blue" className="m-5">
            {isPlayingForNotes ? "Pause" : "Play"}
          </Button>

          <Button onClick={onStopNotes} color="red">
            {isPlayingForNotes ? "Stop" : "Stop"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Predict;
