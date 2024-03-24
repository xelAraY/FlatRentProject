import styled from "@emotion/styled";
import { Stack } from "@mui/material";

interface StyledImageGaleryProps {
  fullscreen?: boolean;
}

export const StyledImageGalery = styled(Stack)<StyledImageGaleryProps>`
  & > div {
    width: 100%;
  }

  & .image-gallery-image {
    object-fit: ${({ fullscreen }) => (fullscreen ? "contained" : "cover")};
    height: ${({ fullscreen }) => fullscreen && "90vh"};
  }

  & .image-gallery-thumbnail-image {
    object-fit: ${({ fullscreen }) => (fullscreen ? "contained" : "cover")};
    height: 70px;
  }

  & .image-gallery-right-nav .image-gallery-svg {
    height: 80px;
  }
  & .image-gallery-left-nav .image-gallery-svg {
    height: 80px;
  }
`;
