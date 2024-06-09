import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const employees = [];
const MyTeam = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myTeams = [], isPending } = useQuery({
    queryKey: ['my-teams-e', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-teams/e/${user?.email}`);
      return data;
    },
  });

  if (isPending || loading) return <LoadingSpinner h={'50vh'} />;

  return (
    <>
      <Title title={'AssetAura | My Team'} />
      <section className="container pt-40">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-10 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Image</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Name</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Type</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {myTeams?.map((employee) => {
                      //   console.log(employee);
                      const { _id, employee_info } = employee ?? {};
                      return (
                        <tr key={_id}>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="">
                              <img
                                className="ml-14 size-14 rounded-full object-cover"
                                src={employee_info?.image}
                                alt=""
                              />
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="capitalize dark:text-gray-300">
                              {employee_info.name}
                            </span>
                          </td>
                          <td>
                            <p className="w-max rounded-full bg-blue-100/60 px-4 py-1.5 text-sm capitalize text-blue-500 dark:bg-gray-800">
                              <span>{employee_info.role}</span>
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>previous</span>
          </a>
          <div className="hidden items-center gap-x-3 lg:flex">
            <a
              href="#"
              className="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800"
            >
              1
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              2
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              3
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ...
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              12
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              13
            </a>
            <a
              href="#"
              className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              14
            </a>
          </div>
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default MyTeam;
