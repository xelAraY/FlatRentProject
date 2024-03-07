import React from "react";
import { FilterOptions } from "./FilterOptions";
import { ListingOverview } from "../HomeComponent/ListingComponent/ListingOverview";
import { Stack } from "@mui/material";

export const RentFindingPage = () => {

  return (
    <Stack flexDirection={"column"} overflow='auto'>
      <FilterOptions />
      <ListingOverview requestPath="api/search/recent" title="Что то" subTitle="Что то" />
    </Stack>
  );
}
