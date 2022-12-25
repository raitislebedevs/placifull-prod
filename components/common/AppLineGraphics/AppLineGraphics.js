import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
import useChart from '../Chart/useChart';
import dynamic from 'next/dynamic';
import { formatNumber } from 'utils/standaloneFunctions';
// // components
// import { useChart } from '../../../components/chart';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
// ----------------------------------------------------------------------

AppLineGraphics.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default function AppLineGraphics({
  title,
  subheader,
  chartLabels,
  chartData,
  currency,
  ...other
}) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '66%' } },
    fill: { type: chartData.map(i => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: y => {
          if (typeof y !== 'undefined') {
            return `${currency} ${formatNumber(y.toFixed(2))}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
