import { useState } from 'react';
import { PieChart as Chart, Pie, Cell, Sector } from 'recharts';

import './styles.css';

interface BarChartProps<T> {
  data: T[];
  dataKey: string;
  onPieClick: (data: T) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
  budget: number;
  remainingBudget: number;
  onHover: (index: number | null) => void; // Added prop for hover event
  index: number;
  onClick: (data: any) => void;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  budget,
  remainingBudget,
  onHover,
  index,
  onClick,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick({ name, budget, remainingBudget })}
    >
      <tspan x={x} dy="-1.2em">
        {name}
      </tspan>
      <tspan x={x} dy="1.2em">{`${remainingBudget}/${budget}`}</tspan>
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10} // Increase the size on hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const BarChart = <T,>({ data, dataKey, onPieClick }: BarChartProps<T>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Chart width={400} height={400}>
      <Pie
        data={data}
        activeShape={renderActiveShape}
        activeIndex={activeIndex!}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ ...props }) => renderCustomizedLabel({ ...props, onHover: setActiveIndex, onClick: onPieClick })}
        outerRadius={150}
        fill="#8884d8"
        dataKey={dataKey}
        className="cursor-pointer outline-none"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
        onClick={onPieClick}
      >
        {data?.map((_, index) => (
          <Cell radius={10} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </Chart>
  );
};

export default BarChart;
