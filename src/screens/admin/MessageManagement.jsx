import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import { orange, purpleColor } from "../../constants/color";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { useFetchData } from "6pp";
import { serverUrl } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((val) => {
            const url = val.url;
            const file = fileFormat(url);

            return (
              <Box>
                <a
                  href={url}
                  target="_blank"
                  download={true}
                  rel="noopener noreferrer"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chats",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
    renderCell: (params) => (
      <>
        {params.row.groupChat ? (
          <span
            style={{
              backgroundColor: orange,
              padding: "10px",
              color: "white",
            }}
          >
            Yes
          </span>
        ) : (
          <span
            style={{
              backgroundColor: purpleColor,
              padding: "10px",
              color: "white",
            }}
          >
            No
          </span>
        )}
      </>
    ),
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${serverUrl}/admin/messages`,
    "dashboard-messages"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data?.transformedMessages?.map((data) => ({
          ...data,
          id: data._id,
          sender: {
            name: data.sender.name,
            avatar: transformImage(data.sender.avatar, 50),
          },
          createdAt: moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
