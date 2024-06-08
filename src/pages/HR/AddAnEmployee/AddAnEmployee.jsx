import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { errorAlert, successAlert } from '../../../utils/alert';

//TODO: add increase the limit button and functionality
// add multiple member with checkbox
// add pagination on table
const AddAnEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loggedInUser, isPending, refetch] = useLoggedInUser();
  const [teamMembers, setTeamMembers] = useState([]);

  const {
    data: employees = [],
    isPending: loading,
    refetch: refetch2,
  } = useQuery({
    queryKey: ['not-affiliated-employee'],
    queryFn: async () => {
      const { data } = await axiosSecure('/employees/not-affiliated');
      return data;
    },
  });

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
  const handleAddMultipleTeamMember = async() => {
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
        },
      };
    });
    try {
      const {data} = await axiosSecure.post(`/teams/multiple`, teamsData)

      refetch()
      refetch2()
      console.log(data);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  if (loading || isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <div className="container px-4 pt-40">
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
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-6 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
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
                            <p className="w-24 rounded-full bg-purple-100/60 py-1.5 text-center text-sm capitalize text-purple-500 dark:bg-gray-800">
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
        {/* pagination */}
        <div>
          <div>
            <button
              onClick={handleAddMultipleTeamMember}
              className="mt-5 rounded border border-emerald-500 px-6 py-2.5 text-sm font-semibold capitalize text-emerald-500 shadow-tableBtn dark:text-white"
            >
              Add selected member{' '}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddAnEmployee;
