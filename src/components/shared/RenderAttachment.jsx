import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video controls src={url} preload="none" width="200px" />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          width="200px"
          height="150px"
          alt="Attachment"
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio controls src={url} preload="none" />;

    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;
