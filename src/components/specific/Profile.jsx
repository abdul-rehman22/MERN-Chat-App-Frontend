import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={transformImage(user?.avatar.url, 150)}
      />
      <ProfileCard
        heading={"Bio"}
        text={user?.bio}
        Icon={<AlternateEmailIcon />}
      />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<FaceIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Date"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarMonthIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, heading, Icon }) => {
  return (
    <Stack
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
      direction={"row"}
      alignItems={"center"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>{" "}
      </Stack>
    </Stack>
  );
};

export default Profile;
