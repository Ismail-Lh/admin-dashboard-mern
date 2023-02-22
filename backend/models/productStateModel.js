import mongoose from 'mongoose';

const productStateSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  { timestamps: true }
);

const ProductState = mongoose.model('ProductState', productStateSchema);

export default ProductState;
