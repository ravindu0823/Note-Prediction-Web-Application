import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import propTypes from "prop-types";

const PopupModal = ({ open, handleOpen }) => {
  return (
    <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
      <DialogHeader className="justify-between">
        <img
          src="https://www.material-tailwind.com/image/exclamation.svg"
          alt="exclamation"
          className="w-10 h-10"
        />
        <IconButton color="gray" size="sm" variant="text" onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll">
        <Typography color="blue-gray" className="mb-1 font-bold">
          Select Notations Data
        </Typography>
        <Typography
          variant="paragraph"
          className="font-normal text-gray-600 max-w-full text-justify"
        >
          Please ensure you select a method that analyzes the song{"'"}s notes
          accurately. Upload an audio file containing a single-instrument
          melody. The background noise should be minimal to ensure the best
          analysis.
        </Typography>
        <div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              color="orange"
              className="text-black mt-7 w-fit lg:max-w-[15rem]"
              onClick={handleOpen}
            >
              I understand, continue
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

PopupModal.propTypes = {
  open: propTypes.bool.isRequired,
  handleOpen: propTypes.func.isRequired,
};

export default PopupModal;
