import React from "react";
import { StyledImageGalery } from "./image-gallery.styled";
import ImageGallery, { ReactImageGalleryProps } from "react-image-gallery";

interface ImageGalleryStyledProps extends ReactImageGalleryProps {
  fullscreen?: boolean;
}
export const ImageGalleryStyled = React.forwardRef(
  (
    props: ImageGalleryStyledProps,
    ref: React.LegacyRef<ImageGallery> | undefined
  ) => {
    const { fullscreen, ...other } = props;
    return (
      <StyledImageGalery
        justifyContent="center"
        alignItems="center"
        onClick={(e: any) => {
          const isBulletTouched = Array.from((e.target as any).classList).find(
            (el: any) => el === "image-gallery-bullet"
          );
          if (isBulletTouched) e.stopPropagation();
        }}
        fullscreen={fullscreen}
      >
        <ImageGallery {...other} ref={ref} />
      </StyledImageGalery>
    );
  }
);
