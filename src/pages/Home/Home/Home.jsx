import useRoll from '../../../hooks/useRoll';
import HRHome from '../../HR/HRHome/HRHome';
import Banner from '../Banner/Banner';
import Packages from '../Packages/Packages';

const Home = () => {
  const [role] = useRoll();
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
  );


  return (
    <div className="container px-4 pt-40">
      {/* for without login user */}
      {role === undefined && (
        <>
          <div>
            <Banner />
          </div>
          <div className="my-20">
            <Packages />
          </div>
        </>
      )}
      {/* For employee */}

      {/* for hr manager */}
      {role === 'HR' && <HRHome />}
    </div>
  );
};

export default Home;
