import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import BlockIcon from "@mui/icons-material/Block";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SecurityIcon from "@mui/icons-material/Security";
import GavelIcon from "@mui/icons-material/Gavel";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BalanceIcon from "@mui/icons-material/Balance";

export const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const options = [
    {
      text: "Управление информацией о себе в профиле",
      icon: <ManageAccountsIcon />,
    },
    {
      text: "Просмотр своих ранее добавленных объявлений",
      icon: <VisibilityIcon />,
    },
    {
      text: "Размещение нового объявления на сайте",
      icon: <DomainAddIcon />,
    },
    {
      text: "Управление списком ваших избранных объявлений",
      icon: <ThumbUpIcon />,
    },
    {
      text: "Выход из аккаунта и авторизация в другом",
      icon: <ExitToAppIcon />,
    },
    {
      text: "Полное удаление текущего аккаунта без возможности восстановления",
      icon: <PersonOffIcon />,
    },
  ];

  const rules = [
    {
      text: "Аккуратность и достоверность информации",
      secondaryText:
        "Пользователи обязаны предоставлять точные и актуальные данные о жилье, которое они сдают в аренду или ищут для аренды.",
      icon: <PublishedWithChangesIcon />,
    },
    {
      text: "Запрет на незаконные предложения",
      secondaryText:
        "Запрещается размещение объявлений о сдаче в аренду незаконных объектов или предложений, нарушающих законодательство страны или местных нормативных актов.",
      icon: <BlockIcon />,
    },
    {
      text: "Уважение и вежливость",
      secondaryText:
        "Пользователи должны вести себя вежливо и уважительно при взаимодействии с другими участниками сообщества, включая владельцев жилья, арендаторов и администраторов сайта.",
      icon: <SentimentSatisfiedAltIcon />,
    },
    {
      text: "Безопасность и приватность",
      secondaryText:
        "Администраторы сайта обязуются предпринимать меры для защиты конфиденциальности и безопасности личных данных пользователей.",
      icon: <SecurityIcon />,
    },
    {
      text: "Модерация и удаление",
      secondaryText:
        "Сайт оставляет за собой право модерировать и удалять объявления, нарушающие правила пользования платформой или содержащие недостоверную информацию.",
      icon: <GavelIcon />,
    },
    {
      text: "Ответственность за контент",
      secondaryText:
        "Пользователи несут ответственность за содержание размещаемых ими объявлений.",
      icon: <BalanceIcon />,
    },
    {
      text: "Разрешение конфликтов",
      secondaryText:
        "В случае возникновения конфликтов между пользователями, они обязуются решать их мирным путем или обращаться за помощью к администрации сайта",
      icon: <SportsKabaddiIcon />,
    },
  ];

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/sign-in");
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setUserName(decodedToken.nickname);
      }
    }
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={800}>
        Приветствуем вас, {userName}!
      </Typography>
      <Stack>
        <Stack spacing={2}>
          <Typography>
            Добро пожаловать в ваш личный кабинет пользователя! Здесь вас ждут
            различные удобные функции и возможности, которые помогут вам
            эффективно управлять вашим аккаунтом. Независимо от того, что вам
            требуется сделать, здесь вы найдете все необходимое для комфортного
            взаимодействия с нашей платформой.
          </Typography>
          <Typography variant="h6">
            Здесь представлен списом функциональных возможностей вашего личного
            кабинета:
          </Typography>
        </Stack>
        <List>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
        <Stack>
          <Typography variant="h6">
            Перед тем как размещать объявление, ознакомьтесь со списком правил и
            требований
          </Typography>
          <List>
            {rules.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>{rule.icon}</ListItemIcon>
                <ListItemText
                  primary={rule.text}
                  secondary={rule.secondaryText}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
};
