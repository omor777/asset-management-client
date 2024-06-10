import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const tips = [
  {
    title: 'Improve Employee Engagement',
    content:
      'Encourage regular feedback, provide growth opportunities, and recognize achievements to keep employees engaged and motivated.',
    icon: '👍',
    bgColor: 'bg-blue-300',
  },
  {
    title: 'Effective Communication',
    content:
      'Promote clear and open communication channels within the team to ensure everyone is on the same page and issues are addressed promptly.',
    icon: '💬',
    bgColor: 'bg-emerald-300',
  },
  {
    title: 'Foster a Positive Work Culture',
    content:
      'Create a supportive and inclusive environment where employees feel valued and respected, enhancing overall job satisfaction.',
    icon: '🌟',
    bgColor: 'bg-purple-300',
  },
];
const BestPractice = () => {
  return (
    <div>
      <SectionTitle title={' HR Tips and Best Practices'} />
      <div className="mx-auto mt-10">
        <ul className="space-y-8">
          {tips.map((tip, index) => (
            <li
              key={index}
              className={`flex min-h-[140px] flex-col space-y-4 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:space-x-6 md:space-y-0 ${tip.bgColor}`}
            >
              <div className="w-full text-4xl text-gray-700 md:w-auto md:text-5xl lg:text-6xl">
                {tip.icon}
              </div>
              <div className="w-full md:flex-1">
                <h3 className="mb-3 font-semibold text-gray-800 md:text-2xl">
                  {tip.title}
                </h3>
                <p className="text-base leading-7 text-gray-700 md:text-lg">
                  {tip.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestPractice;
