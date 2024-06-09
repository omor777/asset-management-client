import { useQuery } from '@tanstack/react-query';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PieChartSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ['chart-data', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/assets/count/${user?.email}`);
      return data;
    },
  });

  const COLORS = ['#4CAF50', '#FF6384'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
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
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <SectionTitle title={'Returnable vs. Non-returnable Items'} />
      <div className="mt-10 rounded-md border border-gray-50 p-8 shadow-md dark:border-gray-600 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-10 flex w-full justify-center lg:mb-0 lg:w-1/2">
            <PieChart width={370} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
          <div className="w-full space-y-8 lg:w-1/2">
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-700 dark:text-gray-100">
                Key Insights
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>60% of items are returnable.</li>
                <li>40% of items are non-returnable.</li>
                <li>
                  Returnable items include office supplies, IT equipment, etc.
                </li>
                <li>
                  Non-returnable items include consumables and personalized
                  items.
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-700 dark:text-gray-100">
                Data Breakdown
              </h3>
              <table className="w-full text-gray-600 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="py-1 text-left">Type</th>
                    <th className="py-1 text-left">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((entry, index) => (
                    <tr key={index}>
                      <td className="py-2">{entry.name}</td>
                      <td className="py-2">{entry.value}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartSection;
