import { Box, useMediaQuery } from '@mui/material';

import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';
import ProductCard from 'components/ProductCard';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box p='2rem'>
      <Header title='PRODUCTS' subtitle='See your list of products.' />
      {data || !isLoading ? (
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}>
          {data.map(product => (
            <ProductCard key={product._id} {...product} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
