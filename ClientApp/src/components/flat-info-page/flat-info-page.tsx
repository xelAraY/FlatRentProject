import React from "react";
import { useParams } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Grid, Stack } from "@mui/material";
import { DetailsPaper, MainPaper } from "./components";

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<RentObjectInformation>();

  React.useEffect(() => {
    const fetchData = async () => {
      return await fetch(`api/flat/${flatId}`).then((data) => data.json());
    };
    fetchData().then((data) => {
      setFlatInfo(data[0]);
    });
  }, [flatId]);

  const mapRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToMap = () => mapRef?.current?.scrollIntoView();

  return (
    <Stack p="3rem 5rem">
      <Grid container columnGap="2rem">
        <Grid item xs={8}>
          <Stack gap="1rem">
            <MainPaper flatInfo={flatInfo} onScrollToMap={scrollToMap} />
            <DetailsPaper flatInfo={flatInfo} />
          </Stack>
        </Grid>
        <Grid item xs="auto">
          <div style={{ position: "sticky", top: "10%" }}>info</div>
        </Grid>
      </Grid>
      <div ref={mapRef}>MAP</div>
    </Stack>
  );
};

export default FlatInfoPage;
