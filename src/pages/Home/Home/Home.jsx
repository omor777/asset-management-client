import useRoll from '../../../hooks/useRoll';
import EmployeeHome from '../../Employee/Home/EmployeeHome';
import HRHome from '../../HR/HRHome/HRHome';
import AboutSection from '../AboutSection/AboutSection';
import Banner from '../Banner/Banner';
import Packages from '../Packages/Packages';

const Home = () => {
  const [role] = useRoll();
  // const now = new Date();
  // const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // const firstDayOfNextMonth = new Date(
  //   now.getFullYear(),
  //   now.getMonth() + 1,
  //   1,
  // );

  return (
    <div className="container px-4 pt-36">
      {/* for without login user */}
      {role === undefined && (
        <>
          <div>
            <Banner />
          </div>
          <div className="mt-32">
            <AboutSection />
          </div>
          <div className="my-32">
            <Packages />
          </div>
        </>
      )}
      {/* For employee */}
      {role === 'employee' && <EmployeeHome />}

      {/* for hr manager */}
      {role === 'HR' && <HRHome />}
    </div>
  );
};

export default Home;
