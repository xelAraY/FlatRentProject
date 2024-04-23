import React, { useEffect, useState } from "react";
import { FilterOptions } from "./FilterOptions";
import {
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatsList } from "./FlatsList";
import { NoFoundObject } from "./NoFoundObject";
import MapIcon from "@mui/icons-material/Map";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CheckIcon from "@mui/icons-material/Check";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import { Button } from "src/shared";

export const RentFindingPage = () => {
  const location = useLocation();
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [favListings, setFavListings] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [favouriteChanged, setFavouriteChanged] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>();
  const [listingsCount, setListingsCount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const LISTINGS_PER_PAGE = 20;

  const sortTypes = [
    { name: "Сначала новые", type: "createdAt" },
    { name: "Сначала дорогие", type: "maxPrice" },
    { name: "Сначала дешевые", type: "minPrice" },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedSortType, setSelectedSortType] = React.useState<string>();
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    setSearchParams(
      (urlParams) => {
        urlParams.set("sortType", type);
        return urlParams;
      },
      { replace: true }
    );
    //setSelectedSortType(type);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavouriteChange = (isChanged: boolean) => {
    setFavouriteChanged(isChanged);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setSearchParams(
      (urlParams) => {
        urlParams.set("page", value.toString());
        return urlParams;
      },
      { replace: true }
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      setLoading(true);

      const response = await fetch(
        `api/search/filter?${
          queryParams ? queryParams.toString() + "&" : ""
        }showData=true`
      );
      const data = await response.json();

      if (response.ok) {
        setRentObjects(data);
      } else {
        console.error("Ошибка при получении данных", data.message);
      }

      const pagesResponse = await fetch(
        `api/search/filter?${
          queryParams ? queryParams.toString() + "&" : ""
        }showData=false`
      );
      const pagesData = await pagesResponse.json();

      if (pagesResponse.ok) {
        setListingsCount(pagesData[0].count);
        const pagesCount = Math.ceil(pagesData[0].count / LISTINGS_PER_PAGE);
        setPages(pagesCount);
      } else {
        console.error("Ошибка при получении данных", pagesData.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getFavouritesListings = async () => {
    if (favouriteChanged) {
      if (isLoggedIn()) {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const favouritesResponce = await fetch(
            `api/account/favourites/${decodedToken.nickname}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await favouritesResponce.json();

          if (favouritesResponce.ok) {
            setFavListings([...data]);
          } else {
            console.error("Ошибка при получении данных", data);
          }
        }
      }
      setFavouriteChanged(false);
    }
  };

  useEffect(() => {
    const currPage = Number(searchParams.get("page"));
    setCurrentPage(currPage ? currPage : 1);
    const sortType = searchParams.get("sortType");
    setSelectedSortType(sortType ? sortType : "createdAt");
    fetchData();
  }, [location.search]);

  useEffect(() => {
    getFavouritesListings();
  }, [favouriteChanged]);

  let ending = "e";
  if (listingsCount) {
    ending =
      listingsCount === 1
        ? "е"
        : listingsCount > 1 && listingsCount < 5
        ? "я"
        : "й";
  }

  return (
    <Stack
      flexDirection={"column"}
      overflow="auto"
      style={{ backgroundColor: "#f3f5f7" }}
    >
      <FilterOptions count={listingsCount ? listingsCount : 0} path="/flats" />
      <Stack
        flexDirection={"column"}
        style={{ padding: "56px 56px 80px 56px" }}
      >
        <Stack flexDirection={"column"} spacing={2} marginBottom={3}>
          <Typography variant="h4">
            Аренда квартир на длительный срок в Беларуси
          </Typography>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography variant="body1">
                <b>{listingsCount}</b> объявлени{ending}
              </Typography>
              <div
                style={{
                  height: "1.5rem",
                  width: "1px",
                  backgroundColor: "rgb(210 214 219)",
                  margin: "0 16px",
                }}
              />
              <NavLink
                to={`/flats/map${location.search}`}
                style={{ textDecoration: "none" }}
              >
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <MapIcon style={{ fontWeight: 100, marginRight: "8px" }} />
                  <Typography fontSize={16} fontWeight={600}>
                    Посмотреть на карте
                  </Typography>
                </Stack>
              </NavLink>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <List>
                <ListItemButton
                  onClick={handleClickListItem}
                  sx={{
                    color: "#0366d6",
                    ":hover": { background: "transparent !important" },
                  }}
                >
                  <SwapVertIcon />
                  <ListItemText
                    primary={
                      sortTypes.find((item) => item.type === selectedSortType)
                        ?.name
                    }
                    sx={{ span: { fontWeight: "600" } }}
                  />
                </ListItemButton>
              </List>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {sortTypes.map((option) => (
                  <MenuItem
                    key={option.name}
                    selected={selectedSortType === option.type}
                    onClick={(event) => handleMenuItemClick(event, option.type)}
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      minWidth: "250px",
                    }}
                  >
                    {option.name}
                    {selectedSortType === option.type && <CheckIcon />}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Stack>
        </Stack>
        {listingsCount === 0 && <NoFoundObject />}
        <Stack spacing={5} alignItems={"center"}>
          <FlatsList
            rentObjects={rentObjects}
            isLoading={loading}
            favourites={favListings}
            onFavouritesChanged={handleFavouriteChange}
          />
          {pages !== 0 && (
            <Pagination
              count={pages}
              page={currentPage}
              onChange={handleChange}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
