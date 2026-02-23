import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { convertYouTubeUrl } from "../utils/youtube";

export default function Project3DCard({ item }) {
  const embedUrl =
    item?.type === "video" ? convertYouTubeUrl(item.media) : "";

  return (
    <CardContainer>
      <CardBody>
        {/* 🎬 MEDIA WRAPPER */}
        <CardItem translateZ={60} className="project-media-wrapper">
          {/* MEDIA */}
          {item.type === "video" && embedUrl ? (
            <iframe
              src={embedUrl}
              title={item.text || "Project video"}
              allowFullScreen
            />
          ) : item.type === "video" ? (
            <video src={item.media} controls />
          ) : (
            <img src={item.media} alt={item.text || "Project image"} />
          )}

          {/* 📝 BOTTOM TEXT (CUSTOM, NOT IMAGE/VIDEO) */}
          {item.text && (
            <div className="media-caption">
              {item.text}
            </div>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
