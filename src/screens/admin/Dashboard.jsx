import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { purpleColor } from "../../constants/color";
import { useFetchData } from "6pp";
import { serverUrl } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${serverUrl}/admin/stats`,
    "dashboard-stats"
  );
  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      justifyContent={"space-between"}
      alignContent={"center"}
      spacing={"2rem"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} icon={<Person />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<Group />} />
      <Widget
        title={"Messages"}
        value={stats?.messagesCount}
        icon={<Message />}
      />
    </Stack>
  );
  return loading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{
            gap: "2rem",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
            c
          >
            <Typography margin={"2rem 0"} variant={"h4"}>
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart || []} />
          </Paper>

          <Paper
            elevation={4}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[
                stats?.totalChatsCount - stats?.groupsCount || 0,
                stats?.groupsCount || 0,
              ]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group />
              <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",

        borderBottom: `3px solid ${purpleColor}`,
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "5px solid rgba(0,0,0,0.9)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"0.6rem"} alignItems={"center"}>
          {icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
