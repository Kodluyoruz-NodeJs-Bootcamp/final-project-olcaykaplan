import{ useState, ChangeEvent }from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../assets/img/logo.png"
import { RootState } from '../../reducers';

const Header = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {isAuthenticated, user} = useSelector((state: RootState) => state.auth)
  const settings = [
    { title: 'Profile', action: 'profile' },
    //{ title: 'Logout', action: logout },
  ];
  const pages = isAuthenticated
    ? [
        { title: 'Discover', path: '/posts' },
        { title: 'Create Post', path: '/create-new-post'},
        { title: 'Your Posts', path: `/user/own-posts/`},
      ]
    : [
        { title: 'Login / Register', path: '/login' },
      ];

  // navigation menu open
  const handleOpenNavMenu = (event:any) => {
    setAnchorElNav(event.currentTarget);
  };
  // user menu open
  const handleOpenUserMenu = (event:any) => {

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
// user menu close
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const ownMenu = (action:any) => {
    dispatch(action());
  };
 
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#082032', height: '8vh' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/' style={{textDecoration:"none", color:"white"}}> 
            <img src={logo} style={{width:"55px", filter: "brightness(0) invert(1)"}}/>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link to={page.path}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} style={{width:"55px", filter: "brightness(0) invert(1)"}}/>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              paddingRight: '25px',
            }}
          >
            {pages.map((page, i) => (
              <Link
                to={page.path}
                style={{ textDecoration: 'none', color: 'white' }}
                key={i}
              >
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>         
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar
                    alt={user.name + " " + user.surname}
                    src={user.picture ? user.picture : "/static/images/avatar/2.jpg"}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={user.name} onClick={handleOpenUserMenu}>
                    <Typography
                      textAlign="center"
                      variant="subtitle2"
                    >
                      {user.name + " " + user.surname}
                    </Typography>
                  </MenuItem>
                  <hr/>
                {settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleOpenUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => ownMenu(setting.action)}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
