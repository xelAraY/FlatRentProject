import { CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfilePage } from "./ProfilePage";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUsers = async () => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await fetch(`api/account/getUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.filter((user: string) => user !== "admin"));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Stack alignItems={"center"} height={"100%"}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack gap={2}>
          {users.map((user, index) => (
            <ProfilePage key={index} userName={user} onUserDelete={getUsers} />
          ))}
        </Stack>
      )}
    </>
  );
};
