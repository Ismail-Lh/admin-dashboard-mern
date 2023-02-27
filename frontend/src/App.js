import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { themeSettings } from 'theme';
import Dashboard from 'scenes/Dashboard';
import Layout from 'scenes/Layout';
import Products from 'scenes/Products';
import Customers from 'scenes/Customers';
import Transactions from 'scenes/Transactions';
import Geography from 'scenes/Geography';
import Overview from 'scenes/Overview';
import Daily from 'scenes/Daily';
import Monthly from 'scenes/Monthly';

function App() {
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/geography' element={<Geography />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/daily' element={<Daily />} />
            <Route path='/monthly' element={<Monthly />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
