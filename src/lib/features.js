import moment from "moment";

export const fileFormat = (url = "") => {
  const fileExtention = url.split(".").pop();

  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  )
    return "video";

  if (fileExtention === "mp3" || fileExtention === "wav") return "audio";

  if (
    fileExtention === "png" ||
    fileExtention === "jpg" ||
    fileExtention === "gif" ||
    fileExtention === "jpeg"
  )
    return "image";

  return "file";
};

export const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

export const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

export const getOrSaveFromLocalStorage = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } else localStorage.setItem(key, JSON.stringify(value));
};
