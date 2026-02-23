export function convertYouTubeUrl(url) {
  if (!url) return "";

  let videoId = "";

  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  } else if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1].split("?")[0];
  }

  if (!videoId) return "";

  return `https://www.youtube.com/embed/${videoId}`;
}
