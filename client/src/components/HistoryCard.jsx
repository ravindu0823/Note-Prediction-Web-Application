import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import propTypes from "prop-types";

const TABLE_HEAD = [
  "Song Name",
  "Mostly Used Chords",
  "Mostly Used Notes",
  "Actions",
];

const AudioHistoryTable = ({ historyData }) => {
  const extractSongName = (songName) => {
    // Split the path by 'Z' and take the last part
    const parts = songName.split("Z");
    const lastPart = parts.pop();

    // Use regular expression to match the pattern and extract the song name
    const match = lastPart.match(/([\w-]+)(?=\.\w{3}$)/);

    // Replace underscores or hyphens with spaces
    return match ? match[0].replace(/[_-]/g, " ") : null;
  };

  const sortChordsByName = (audioData) => {
    // Sort the array by the chord name
    const sortedAudioData = audioData.sort((a, b) =>
      a.note.localeCompare(b.note)
    );

    // Create a Set from the sorted array to ensure uniqueness
    const uniqueAudioDataSet = new Set(
      sortedAudioData.map((data) => data.note)
    );

    // Convert the Set back to an array to return the unique chord names
    const uniqueArray = Array.from(uniqueAudioDataSet);

    return uniqueArray.join(", ");
  };
  return (
    <>
      <Card className="h-full w-fit overflow-scroll mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyData.length > 1 ? (
              historyData.map(({ _id, chords, notes, songId }) => (
                <tr key={_id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {extractSongName(songId.songPath)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {chords.length > 0 ? sortChordsByName(chords) : "N/A"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {notes.length > 0 ? sortChordsByName(notes) : "N/A"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton size="sm" color="red" className="rounded-md">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={4} className="text-center">
                Loading
              </td>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

AudioHistoryTable.propTypes = {
  historyData: propTypes.array.isRequired,
};

export default AudioHistoryTable;
