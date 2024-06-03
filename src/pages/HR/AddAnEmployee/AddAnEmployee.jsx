import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useHrData from '../../../hooks/useHrData';
import { errorAlert, successAlert } from '../../../utils/alert';

const AddAnEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [hrData] = useHrData();

  const {
    data: employees = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['not-affiliated-employee'],
    queryFn: async () => {
      const { data } = await axiosSecure('/employees/not-affiliated');
      return data;
    },
  });

  // handle add to team
  const { mutateAsync } = useMutation({
    mutationFn: async (teamMemberData) => {
      const { data } = await axiosSecure.post(`/teams`, teamMemberData);
      return data;
    },
    onSuccess: (data) => {
      //   console.log(data);
      if (data.insertedId) {
        refetch();
        successAlert('Team member added successfully');
      }
    },
  });

  const handleAddToTeam = async (employee) => {
    // console.log(employee);
    const teamMemberData = {
      employeeId: employee._id,
      teamId: hrData._id,
      join_date: new Date(),
      employee_info: {
        name: employee.name,
        email: employee.email,
        image: employee.image,
        date_of_birth: employee.date_of_birth,
        role: employee.role,
      },
      hr_info: {
        name: hrData.name,
        email: hrData.email,
        company_name: hrData.company_name,
      },
    };
    try {
      await mutateAsync(teamMemberData);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <>
      <section className="container px-4 pt-40">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Select Member</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
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

                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {employees?.map((employee) => {
                      const { _id, image, name, role } = employee ?? {};
                      return (
                        <tr key={_id}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            <div className="ml-5">
                              <input
                                type="checkbox"
                                defaultValue=""
                                className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="">
                              <img
                                className="ml-5 size-14 rounded-full object-cover"
                                src={image}
                                alt=""
                              />
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="capitalize dark:text-gray-300">
                              {name}
                            </span>
                          </td>
                          <td>
                            <p className="w-max rounded-full bg-pink-100/60 px-4 py-1.5 text-sm capitalize text-pink-500 dark:bg-gray-800">
                              <span>{role}</span>
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() => handleAddToTeam(employee)}
                              className="w-20 rounded bg-primary py-1 text-sm font-medium text-white shadow-tableBtn transition-colors duration-200 hover:bg-blue-700"
                            >
                              Add
                            </button>
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

export default AddAnEmployee;
