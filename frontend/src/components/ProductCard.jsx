import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from '@mui/material';

const ProductCard = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  productState,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom>
          {category}
        </Typography>

        <Typography variant='h5' component='div'>
          {name}
        </Typography>

        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        <Rating value={rating} readOnly />

        <Typography variant='body2'>{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {productState[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {productState[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
