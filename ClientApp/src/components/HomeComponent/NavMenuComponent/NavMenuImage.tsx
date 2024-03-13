import { Stack } from "@mui/material";
import { SearchComponent } from "./SearchComponent/SearchComponent";

export const NavMenuImage = () => {
  return (
    <div className="nav-menu-image">
      <Stack flexDirection="column" alignItems="center" marginTop={15}>
        <h1 className="nav-menu-image-text">
          Онлайн сервис для поиска
          <br />
          арендного жилья в Беларуси
        </h1>
        <h3 className="nav-menu-image-subtext">
          Самый быстрый и доступный способ
          <br />
          найти жилье в любой точке страны!
        </h3>
        <SearchComponent />
      </Stack>
    </div>
  );
};
