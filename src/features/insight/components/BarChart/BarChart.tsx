import { PieChart, Pie, Cell } from 'recharts';

interface BarChartProps<T> {
  data: T[];
  dataKey: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  amount,
  remainingBudget,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      <tspan x={x} dy="-1.2em">
        {name}
      </tspan>
      <tspan x={x} dy="1.2em">{`${remainingBudget}/${amount}`}</tspan>
    </text>
  );
};

const BarChart = <T,>({ data, dataKey }: BarChartProps<T>) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ ...props }) => renderCustomizedLabel({ ...props })} // Pass the name to the label
        outerRadius={150}
        fill="#8884d8"
        dataKey={dataKey}
        className="cursor-pointer"
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default BarChart;
