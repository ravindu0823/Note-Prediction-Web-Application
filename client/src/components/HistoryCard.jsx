import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import propTypes from "prop-types";

const TABLE_HEAD = [
  "Song Name",
  "Mostly Used Chords",
  "Mostly Used Notes",
  "Actions",
];

const AudioHistoryTable = ({ historyData, onClick }) => {
  const extractSongName = (songName) => {
    // Remove the .mp3 extension
    let formattedName = songName.replace(/\.(mp3|wav)$/, "");
    // Replace underscores and hyphens with spaces
    formattedName = formattedName.replace(/[_-]/g, " ");
    return formattedName;
  };

  const sortMostlyUsedData = (audioData) => {
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

    // Remove N note from the array
    const uniqueArrayWithOutN = uniqueArray.filter(
      (element) => !element.includes("N")
    );

    return uniqueArrayWithOutN.join(", ");
  };
  return (
    <>
      <Card className="max-h-[450px] w-fit overflow-scroll mt-5">
        <table className="w-full min-w-max text-left">
          <thead className="sticky top-0">
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
                      {chords.length > 0 ? sortMostlyUsedData(chords) : "N/A"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {notes.length > 0 ? sortMostlyUsedData(notes) : "N/A"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Tooltip content="Delete History">
                      <IconButton
                        size="sm"
                        color="red"
                        className="rounded-md"
                        onClick={() => onClick(_id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
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
  onClick: propTypes.func.isRequired,
};

export default AudioHistoryTable;
