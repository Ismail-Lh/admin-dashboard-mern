import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  useTheme,
  Typography,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';

import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpeg';

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Client Facing',
    icon: null,
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    text: 'Customers',
    icon: <Groups2Outlined />,
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActiveLink(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
          }}>
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
          </Box>

          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: '2.25rem 0rem 1rem 3rem' }}>
                    {text}
                  </Typography>
                );
              }

              const lowerText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lowerText}`);
                      setActiveLink(lowerText);
                    }}
                    sx={{
                      backgroundColor:
                        activeLink === lowerText
                          ? theme.palette.secondary[300]
                          : 'transparent',
                      color:
                        activeLink === lowerText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}>
                    <ListItemIcon
                      sx={{
                        ml: '2rem',
                        color:
                          activeLink === lowerText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={text} />

                    {activeLink === lowerText && (
                      <ChevronRightOutlined sx={{ ml: 'auto' }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
