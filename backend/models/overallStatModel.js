import mongoose from 'mongoose';

const overAllStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    salesByCategory: {
      type: Map,
      of: Number,
    },
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  { timestamps: true }
);

const OverAllStat = mongoose.model('OverAllStat', overAllStatSchema);

export default OverAllStat;
