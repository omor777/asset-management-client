import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { errorAlert, successAlert, warningAlert } from '../../../utils/alert';

const AddAnEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [loggedInUser, isPending, refetch] = useLoggedInUser();
  const [teamMembers, setTeamMembers] = useState([]);

  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isPending: loading,
    refetch: refetch2,
  } = useQuery({
    queryKey: ['not-affiliated-employee', currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/employees/not-affiliated?page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const employees = data?.employees;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!loading) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  // added single employee at a time
  const { mutateAsync } = useMutation({
    mutationFn: async (teamMemberData) => {
      const { data } = await axiosSecure.post(`/teams/single`, teamMemberData);
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        refetch();
        refetch2();
        successAlert('Team member added successfully');
      }
    },
  });

  const handleAddToTeam = async (employee) => {
    if (loggedInUser?.employee_count >= loggedInUser?.member_limit)
      return warningAlert('Please increase your memeber limit');

    const teamMemberData = {
      employeeId: employee._id,
      teamId: loggedInUser._id,
      join_date: new Date(),
      employee_info: {
        name: employee.name,
        email: employee.email,
        image: employee.image,
        date_of_birth: employee.date_of_birth,
        role: employee.role,
      },
      hr_info: {
        name: loggedInUser.name,
        email: loggedInUser.email,
        company_name: loggedInUser.company_name,
        company_logo: loggedInUser.company_logo,
      },
    };
    try {
      await mutateAsync(teamMemberData);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleCheckbox = (e, employee) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setTeamMembers([...teamMembers, employee]);
    } else {
      //
      setTeamMembers(
        [...teamMembers].filter((tm) => {
          return tm?._id !== employee?._id;
        }),
      );
    }
    // const teamMemberData = {
    //   employeeId: employee._id,
    //   teamId: loggedInUser._id,
    //   join_date: new Date(),
    //   employee_info: {
    //     name: employee.name,
    //     email: employee.email,
    //     image: employee.image,
    //     date_of_birth: employee.date_of_birth,
    //     role: employee.role,
    //   },
    //   hr_info: {
    //     name: loggedInUser.name,
    //     email: loggedInUser.email,
    //     company_name: loggedInUser.company_name,
    //   },
    // };
  };

  // handle add multiple team member
  const handleAddMultipleTeamMember = async () => {
    if (loggedInUser?.employee_count >= loggedInUser?.member_limit)
      return warningAlert('Please increase your memeber limit');

    const teamsData = teamMembers.map((employee) => {
      return {
        employeeId: employee._id,
        teamId: loggedInUser._id,
        join_date: new Date(),
        employee_info: {
          name: employee.name,
          email: employee.email,
          image: employee.image,
          date_of_birth: employee.date_of_birth,
          role: employee.role,
        },
        hr_info: {
          name: loggedInUser.name,
          email: loggedInUser.email,
          company_name: loggedInUser.company_name,
          company_logo: loggedInUser.company_logo,
        },
      };
    });
    try {
      const { data } = await axiosSecure.post(`/teams/multiple`, teamsData);

      if (data.acknowledged) {
        setTeamMembers([]);
        refetch2();
        refetch();
      }
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading || isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <div className="container mb-24 pt-40">
      <Title title={'AssetAura | Add an Employee'} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex h-[13.75rem] flex-col items-center justify-center gap-4 rounded-md bg-emerald-500 shadow-md">
          <h1 className="text-4xl font-bold text-white">Total Employee</h1>
          <h3 className="text-6xl font-extrabold text-white">
            {loggedInUser?.employee_count ? loggedInUser?.employee_count : '0'}
          </h3>
        </div>
        <div className="flex h-[13.75rem] flex-col items-center justify-center gap-4 rounded-md bg-purple-500 shadow-md">
          <h1 className="text-4xl font-bold capitalize text-white">
            Member Limit
          </h1>
          <h3 className="text-6xl font-extrabold text-white">
            {loggedInUser?.member_limit}
          </h3>
        </div>
      </div>
      <Link to={'/payment'} className="mt-8 flex items-center justify-center">
        <button className="rounded border border-blue-500 px-8 py-3 text-sm font-bold uppercase text-blue-500 shadow-md transition-colors duration-200 hover:bg-blue-500 hover:text-white dark:text-white">
          increase limit
        </button>
      </Link>
      <section className="mt-12">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Select Member</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Image</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Name</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Type</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {employees?.map((employee) => {
                      const { _id, image, name, role } = employee ?? {};
                      return (
                        <tr
                          className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          key={_id}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-700">
                            <div className="pl-6">
                              <input
                                onChange={(e) => {
                                  handleCheckbox(e, employee);
                                }}
                                type="checkbox"
                                defaultValue=""
                                className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="">
                              <img
                                className="mx-auto size-14 rounded-full object-cover"
                                src={image}
                                alt=""
                              />
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-700">
                            <span className="capitalize dark:text-gray-300">
                              {name}
                            </span>
                          </td>
                          <td>
                            <p className="mx-auto w-24 rounded-full bg-purple-100/60 py-1.5 text-center text-sm capitalize text-purple-500 dark:bg-gray-800">
                              <span>{role}</span>
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() => handleAddToTeam(employee)}
                              className="mx-auto block w-20 rounded bg-primary py-1 text-sm font-medium text-white shadow-tableBtn transition-colors duration-200 hover:bg-blue-700"
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
        {/* pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <button
              disabled={teamMembers.length < 1}
              onClick={handleAddMultipleTeamMember}
              className={`mt-5 rounded border border-emerald-500 px-6 py-2.5 text-sm font-semibold capitalize text-emerald-500 shadow-tableBtn dark:text-white ${teamMembers.length < 1 ? 'cursor-not-allowed' : ''}`}
            >
              Add selected member{' '}
            </button>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={handlePrevButton}
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-2.5 w-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>

              {pages?.map((page) => {
                return (
                  <li key={page}>
                    <button
                      onClick={() => handlePagination(page)}
                      className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === page ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}

              <li>
                <button
                  onClick={handleNextButton}
                  className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-2.5 w-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default AddAnEmployee;
