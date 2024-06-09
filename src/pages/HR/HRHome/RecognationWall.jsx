import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const RecognitionWall = () => {
  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      achievement: 'Employee of the Month',
      img: 'https://i.ibb.co/ZLG9wrr/pexels-spencer-selover-142259-428333.jpg',
    },
    {
      id: 2,
      name: 'Bob Lee',
      achievement: 'Outstanding Performance Award',
      img: 'https://i.ibb.co/X8ydtK4/pexels-olly-775091.jpg',
    },
    {
      id: 3,
      name: 'Emily Smith',
      achievement: 'Innovation Excellence Award',
      img: 'https://i.ibb.co/QH8XLBm/pexels-hannah-nelson-390257-1065084.jpg',
    },
    {
      id: 4,
      name: 'David Miller',
      achievement: 'Leadership Excellence Award',
      img: 'https://i.ibb.co/hB5KR3M/pexels-nkhajotia-1516680.jpg',
    },
  ];
  return (
    <div>
      <SectionTitle title={'Employee Recognition Wall'} />
      <div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="group cursor-pointer rounded-lg bg-white p-6 shadow-md dark:bg-gray-900"
            >
              <div className="flex h-24 items-center justify-center">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={employee.img}
                  alt={employee.name}
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {employee.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognitionWall;
