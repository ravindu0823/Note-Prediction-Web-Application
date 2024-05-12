import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { ComplexNavbar } from "../components/NavBar";
import { useContext, useEffect, useMemo, useState } from "react";
import { PredictSchema } from "../models/Predict";
import axios, {
  DELETE_HISTORY,
  GET_HISTORY,
  GET_USER,
  USER_UPDATE,
} from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import { UserData } from "../models/User";
import AudioHistoryTable from "../components/HistoryCard";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import { ReactToast } from "../utils/ReactToast";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([PredictSchema]);
  const [userData, setUserData] = useState(UserData);
  const { user, signOut, setUser } = useContext(AuthContext);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(`${GET_HISTORY}/${user.userId}`);

        if (response.status === 404) return;

        setHistoryData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${GET_USER}/${user.userId}`);

        if (response.status === 404) return;

        setUserData(response.data.user);
        setUser({
          ...user,
          image: response.data.user.image,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
    getHistory();
  }, [setUser]);

  const handleDeleteHistory = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${DELETE_HISTORY}/${id}`);

      if (response.status === 404) return;

      setHistoryData(historyData.filter((data) => data._id !== id));
      ReactToast("History deleted successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function () {
      setUserData({ ...userData, image: reader.result });
    };

    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleUserUpdate = async () => {
    console.log(userData);

    try {
      const response = await axios.put(`${USER_UPDATE}/${user.userId}`, {
        userData,
      });

      if (response.status === 404) return;

      setUserData(response.data.newUser);
      setUser({
        ...user,
        fullName: response.data.newUser.fullName,
        email: response.data.newUser.email,
        image: response.data.newUser.image,
      });

      ReactToast("Profile updated successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-hero-image h-full bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply mx-auto">
      <ComplexNavbar className="mx-auto max-w-screen-xl" />
      <div className="justify-center flex flex-col gap-5 lg:flex-row">
        <ScrollAnimationWrapper>
          <motion.div
            className="sm:flex items-center sm:h-screen rounded-md"
            variants={scrollAnimation}
          >
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm mt-14 ml-4 my-auto bg-[#111827] border rounded-lg border-cyan-500 h-fit">
              <div className="bg-gradient-to-br from-gray-900 to-gray-100 rounded-t-lg h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                />
              </div>
              <div
                className="mx-auto w-32 h-32 relative border-2 border-blue-500 -mt-16 rounded-full overflow-hidden"
                onClick={handleClick}
              >
                <Avatar
                  size="lg"
                  variant="rounded"
                  withBorder={true}
                  color="blue"
                  alt="avatar"
                  src={
                    userData.image
                      ? userData.image
                      : user.image
                      ? user.image
                      : "https://docs.material-tailwind.com/img/face-2.jpg"
                  }
                  className="object-cover object-center w-full h-full border"
                />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={convertToBase64}
                />
              </div>

              <Typography
                variant="lead"
                className="text-center text-white mt-2"
              >
                <span className="cursor-not-allowed">{userData.userName}</span>
              </Typography>
              <div className="text-center mt-5 mx-5">
                <Input
                  type="text"
                  label="Full Name"
                  color="white"
                  size="md"
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
              </div>
              <div className="text-center mx-5 mt-5">
                <Input
                  type="email"
                  label="Email"
                  color="white"
                  size="md"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>

              <div className="text-center mt-2">
                <h2 className="font-semibold text-white mt-6">
                  Member Status
                  <Typography
                    variant="lead"
                    color="green"
                    className="font-bold"
                  >
                    {userData.status}
                  </Typography>
                </h2>
              </div>

              <div className="p-4 mt-2">
                <Button
                  className="w-1/2 block mx-auto rounded-md hover:shadow-lg font-semibold px-7 py-2"
                  color="blue"
                  onClick={handleUserUpdate}
                >
                  Update Profile
                </Button>
              </div>

              <ul className=" text-gray-700 flex items-center justify-around"></ul>
              <div className="p-4 border-t mx-8 mt-2">
                <Button
                  className="w-1/2 block mx-auto rounded-md hover:shadow-lg font-semibold px-7 py-2"
                  color="red"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <motion.div
            className="bg-[#111827] mt-14 text-white border rounded-lg border-cyan-500 h-[585px] lg:w-fit"
            variants={scrollAnimation}
          >
            <div className="mx-10 my-6">
              <Typography variant="h3" className="font-bold text-center">
                Notations History
              </Typography>

              {isLoading ? (
                <Typography variant="lead" className="text-center mt-5">
                  Loading...
                </Typography>
              ) : !isLoading && historyData.length > 1 ? (
                <AudioHistoryTable
                  historyData={historyData}
                  onClick={handleDeleteHistory}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Typography variant="lead" className="mt-5">
                    You have no previous predicted data
                  </Typography>
                  <ButtonPrimary addClass={"mt-32 w-fit"} onClick={() => navigate("/predict")}>
                    Analyze Song
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Profile;
