import React from "react";
import { useParams } from "react-router-dom";
import { StyledImageGalery } from "../../shared/image-gallery/image-gallery.styled";
import ImageGallery from "react-image-gallery";
import { ImageGalleryStyled } from "src/shared";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Grid, Stack } from "@mui/material";

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<RentObjectInformation>();
  const [fullScreen, setFullScreen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      return await fetch(`api/flat/${flatId}`).then((data) => data.json());
    };
    const response = fetchData().then((data) => {
      setFlatInfo(data[0]);
    });
  }, [flatId]);

  const [images, setImages] = React.useState<ForPhotos[]>([]);

  React.useEffect(() => {
    let imagess: ForPhotos[] = [];
    if (flatInfo?.photos) {
      flatInfo.photos.map((photo: any) =>
        imagess.push({
          original: photo,
          thumbnail: photo,
          originalHeight: 500,
          originalWidth: 100,
        })
      );
    }
    setImages(imagess);
  }, [flatInfo?.photos]);

  const imageGalleryRef = React.useRef<ImageGallery | null>(null);

  return (
    <Stack>
      {flatInfo?.rentObject?.title}
      <Grid container>
        <Grid item xs={8}>
          {flatInfo?.photos.length ? (
            <ImageGalleryStyled
              items={images}
              showNav={true}
              showThumbnails={true}
              autoPlay={false}
              showPlayButton={false}
              showFullscreenButton={true}
              showBullets={true}
              lazyLoad={true}
              infinite={true}
              isRTL={false}
              fullscreen={fullScreen}
              onScreenChange={(fullScreen) => setFullScreen(fullScreen)}
              ref={imageGalleryRef}
            />
          ) : (
            <img
              src={"https://realt.by/_next/static/media/no-photo.850f218e.svg"}
              alt="photo_preview"
              height={500}
              width="100%"
            />
          )}
        </Grid>
        <Grid item xs="auto">
          <div style={{ position: "sticky", top: "10%" }}>info</div>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FlatInfoPage;
