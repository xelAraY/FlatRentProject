import React, { useEffect, useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import { UserFlatPreviewCard } from "./Components/UserFlatPreviewCard";
import { SkeletonPreview } from "./Components/SkeletonPreview";
import { NoFoundObject } from "./Components/NoFoundObject";

export const PostedListings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pages, setPages] = useState<number>(1);
  const [listingsCount, setListingsCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const LISTINGS_PER_PAGE = 20;

  useEffect(() => {
    const getUserListings = async () => {
      if (isLoggedIn()) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const decodedToken: any = jwtDecode(token);
            setLoading(true);

            const response = await fetch(
              `api/account/getUserListings/${decodedToken.nickname}?showData=false`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();
            if (response.ok) {
              setListingsCount(data[0].count);
              const pagesCount = Math.ceil(data[0].count / LISTINGS_PER_PAGE);
              setPages(pagesCount);

              let page = Number(searchParams.get("page"));
              if (page) {
                if (page > pagesCount) {
                  page = 1;
                  setSearchParams(
                    (urlParams) => {
                      urlParams.set("page", "1");
                      return urlParams;
                    },
                    { replace: true }
                  );
                }
              } else {
                page = 1;
              }
              setCurrentPage(page);

              await fetch(
                `api/account/getUserListings/${decodedToken.nickname}?page=${page}&showData=true`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      `Failed to fetch user data: ${response.status} ${response.statusText}`
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  setRentObjects(data);
                })
                .catch((error) => {
                  console.error("Error fetching user data:", error);
                })
                .finally(() => {
                  setLoading(false);
                });
            } else {
              throw new Error(
                `Failed to fetch user data: ${response.status} ${response.statusText}`
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("/sign-in");
      }
    };

    getUserListings();
  }, []);

  // useEffect(() => {
  //   if (pages) {
  //     const queryParams = new URLSearchParams(location.search);
  //     const currPage = Number(queryParams.get("page"));
  //     console.log("Установка текушей страницы ", currPage);
  //     console.log("Общее число страниц ", pages);
  //     if (currPage) {
  //       if (currPage > pages) {
  //         setCurrentPage(1);
  //         setSearchParams(
  //           (urlParams) => {
  //             urlParams.set("page", "1");
  //             return urlParams;
  //           },
  //           { replace: true }
  //         );
  //       } else {
  //         setCurrentPage(currPage);
  //       }
  //     } else {
  //       setCurrentPage(1);
  //     }
  //   }
  // }, [pages]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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

  const lastDigit = listingsCount % 10;
  const lastTwoDigits = listingsCount % 100;
  const listingsText =
    lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? "объявлений"
      : lastDigit === 1
      ? "объявление"
      : lastDigit >= 2 && lastDigit <= 4
      ? "объявления"
      : "объявлений";

  return (
    <Stack style={{ backgroundColor: "#f3f5f7", paddingTop: "10px" }}>
      <Stack px="12rem">
        {rentObjects.length === 0 && !loading ? (
          <NoFoundObject
            headerText="На данный момент у вас нет размещенных объявлений"
            descriptionText="Для размещения нового объявления перейдите на странциу добавления объявления"
          />
        ) : (
          <Stack spacing={5}>
            <Stack spacing={2}>
              <Typography variant="body1">
                <b>{listingsCount}</b> {listingsText}
              </Typography>
              {loading ? (
                <>
                  <SkeletonPreview />
                </>
              ) : (
                <>
                  {rentObjects?.map((rentObject, index) => (
                    <UserFlatPreviewCard
                      rentInformation={rentObject}
                      onCardClick={(flatId: number) =>
                        navigate(`/flats/${flatId}`)
                      }
                    />
                  ))}
                </>
              )}
            </Stack>
            {pages > 1 && (
              <Pagination
                count={pages}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
