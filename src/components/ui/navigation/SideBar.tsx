import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import MiIcono from "@/assets/logoProject.png";
import HomeIcon from "@mui/icons-material/Home";
import { paths } from "@/core/constants";
import { Link, useLocation } from "react-router-dom";
import Auth from "@/core/services/auth/auth";
import { Tooltip } from "@mui/material";
import { sidebarWidth } from "@/core/constants/severityTypes";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = sidebarWidth;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const pagesList = [
  {
    link: paths.DASHBOARD,
    name: "Dashboard",
    icon: <HomeIcon />,
  },
];
const secondList = [
  {
    link: paths.USER,
    name: "Usuarios",
    icon: <PersonIcon />,
  },
  {
    name: "Submenú",
    icon: <MenuIcon />,
    subMenu: [
      {
        link: paths.DASHBOARD,
        name: "Página 1",
        icon: <PersonIcon />,
      },
      {
        link: paths.USER,
        name: "Página 2",
        icon: <PersonIcon />,
      },
    ],
  },
];
interface SideBarProps {
  open: boolean;
  setOpen: Function;
}
function SideBar({ open, setOpen }: SideBarProps) {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const colorCustom = theme.palette.mode === "light" ? "#EEF2F6" : "#2d2e2f";
  const [paymentView] = useState(true);
  const shouldShowDivider = paymentView;
  const allowedPages = pagesList;
  const allowedTwoPages = secondList;
  const handleClick = (index: any) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };
  function getScreenWidth(): number {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 0;
  }
  let screenSize = getScreenWidth();

  //en pantalla movil empieza desde la parte superior
  useEffect(() => {
    if (window.innerWidth <= 767) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={MiIcono}
            style={{ width: "40px", height: "auto", marginRight: "10px" }}
            alt="Icono"
          />
          template-react-web
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(191,192,194)",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
            },
          },
        }}
      >
        <List>
          {allowedPages.map((page) => (
            <ListItem key={page.name} disablePadding sx={{ display: "block" }}>
              <Link
                to={page.link}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  if (screenSize <= 767) {
                    handleDrawerClose();
                  } else {
                  }
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      currentPath === page.link ? colorCustom : "inherit",
                    color: "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip
                      title={page.name}
                      arrow
                      TransitionComponent={Zoom}
                      placement="right"
                    >
                      {page.icon}
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText
                    primary={page.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        {shouldShowDivider && <Divider />}
        <List>
          {allowedTwoPages.map((page, index) => (
            <Fragment key={page.name}>
              <ListItem disablePadding sx={{ display: "block" }}>
                {page.subMenu ? (
                  <>
                    <ListItemButton
                      onClick={() => {
                        if (screenSize <= 767 && page.link) {
                          handleDrawerClose();
                        } else {
                          handleClick(index);
                        }
                      }}
                      sx={{
                        minHeight: 40,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor:
                          currentPath === page.link ? colorCustom : "inherit",
                        color: "inherit",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip
                          title={page.name}
                          arrow
                          TransitionComponent={Zoom}
                          placement="right"
                        >
                          {page.icon}
                        </Tooltip>
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={page.name}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                      {openSubMenu === index && open ? (
                        <ExpandMoreIcon />
                      ) : (
                        openSubMenu != index && open && <ChevronRightIcon />
                      )}
                    </ListItemButton>
                    {openSubMenu === index && (
                      <List component="div" disablePadding>
                        {page.subMenu.map((subPage) => (
                          <ListItem
                            key={subPage.name}
                            disablePadding
                            sx={{ display: "block", pl: open ? 4 : 0 }}
                            component="div"
                          >
                            <Link
                              to={subPage.link}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              onClick={() => {
                                if (screenSize <= 767) {
                                  handleDrawerClose();
                                } else {
                                }
                              }}
                            >
                              <ListItemButton
                                sx={{
                                  minHeight: 35,
                                  justifyContent: open ? "initial" : "center",
                                  px: 2.5,
                                  backgroundColor:
                                    currentPath === subPage.link
                                      ? colorCustom
                                      : "inherit",
                                  color: "inherit",
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Tooltip
                                    title={subPage.name}
                                    arrow
                                    TransitionComponent={Zoom}
                                    placement="right"
                                  >
                                    {subPage.icon}
                                  </Tooltip>
                                </ListItemIcon>
                                {open && (
                                  <ListItemText
                                    primary={subPage.name}
                                    sx={{ opacity: open ? 1 : 0 }}
                                  />
                                )}
                              </ListItemButton>
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </>
                ) : (
                  <Link
                    to={page.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => {
                      if (screenSize <= 767) {
                        handleDrawerClose();
                      } else {
                      }
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor:
                          currentPath === page.link ? colorCustom : "inherit",
                        color: "inherit",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip
                          title={page.name}
                          arrow
                          TransitionComponent={Zoom}
                          placement="right"
                        >
                          {page.icon}
                        </Tooltip>
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={page.name}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            </Fragment>
          ))}
        </List>
        {/* {shouldShowDivider && <Divider />} */}
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              to={paths.LOGIN}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  Auth.logout();
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip
                    title={"Salir"}
                    arrow
                    TransitionComponent={Zoom}
                    placement="right"
                  >
                    <LogoutIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Salir"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                window.open("https://www.ruway.tech");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title={"Ruway.tech"}
                  arrow
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <LanguageIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText
                primary={"www.ruway.tech"}
                color="secondary"
                sx={{
                  opacity: open ? 1 : 0,
                  color: theme.palette.mode === "light" ? "blue" : "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
export default SideBar;
