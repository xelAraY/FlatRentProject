import { IconButton, Link, Stack, Typography } from "@mui/material";
import React from "react";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer = () => {
  return (
    <Stack direction={"row"} marginTop={3} style={{ backgroundColor: "#2b2b2b", color: "white" }} alignItems={"center"} justifyContent={"space-between"}>
      <Stack direction={"column"} style={{ padding: "16px 0 16px 16px" }}>
        <Typography fontWeight={800} fontSize={16}>Created by</Typography>
        <Typography fontWeight={800} fontSize={16} marginBottom={2}>Alexey Yarohovich</Typography>
        <Stack direction={"row"} spacing={2}>
          <Link href="https://t.me/Alexey_Yarohovich">
            <IconButton style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
              <TelegramIcon style={{ color: "#29a9ea" }} />
            </IconButton>
          </Link>

          <Link href="https://www.instagram.com/alexey.yaro1807?utm_source=qr&igsh=YjJsMzIzYjJyaGVu">
            <IconButton style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
              <InstagramIcon />
            </IconButton>
          </Link>

          <Link href="https://www.youtube.com/channel/UCUJWv97laa06PJyokB6Phgg">
            <IconButton style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
              <YouTubeIcon style={{ color: "red" }} />
            </IconButton>
          </Link>

          <IconButton style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
            <LinkedInIcon style={{ color: "#0a66c2" }} />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction={"column"} sx={{ padding: "16px 16px 16px 0" }}>
        <Typography fontWeight={800} fontSize={16} paddingBottom={2}>Ссылка на телеграм бота</Typography>
        <img src="./../../qr-code.png" width={100} height={100} alt="Qr code for telegram bot" />
      </Stack>
    </Stack>
  )
}