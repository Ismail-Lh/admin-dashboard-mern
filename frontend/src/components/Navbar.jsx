import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';

import FlexBetween from './FlexBetween';
import { setMode } from 'state';
import profileImage from 'assets/profile.jpeg';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'>
            <InputBase placeholder='Search...' />

            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
