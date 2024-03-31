import React, { useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { RentObject } from "src/interfaces/RentObj";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "src/shared";

interface DescriptionPaperProps {
  flatInfo?: RentObject;
  preferences?: string[];
}

const DescriptionPaper: React.FC<DescriptionPaperProps> = ({ flatInfo }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [wrap, setWrap] = React.useState(true);
  const [collapseButton, setShowCollapseButton] = React.useState(false);

  React.useLayoutEffect(() => {
    if (ref.current?.scrollWidth !== ref.current?.clientWidth) {
      setWrap(true);
      setShowCollapseButton(true);
    } else {
      if (!collapseButton) {
        setShowCollapseButton(false);
      }
    }
  }, [ref.current?.scrollWidth, ref.current?.clientWidth, wrap]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: "2rem",
        borderRadius: "0.375rem",
        hyphens: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {"Описание"}
      </Typography>

      <Typography
        variant="subtitle1"
        noWrap={wrap}
        ref={ref}
        onClick={() => setWrap(!wrap)}
      >
        {flatInfo?.description}
      </Typography>

      {collapseButton && (
        <Box>
          <Button
            disableTouchRipple
            onClick={() => setWrap(!wrap)}
            endIcon={wrap ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            sx={{ p: 0, ":hover": { background: "none" } }}
          >
            {wrap ? "Развернуть" : "Свернуть"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default DescriptionPaper;
