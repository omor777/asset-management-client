import useRoll from '../../../hooks/useRoll';
import Banner from '../Banner/Banner';
import Packages from '../Packages/Packages';

const Home = () => {
  const [role] = useRoll();


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
    </div>
  );
};

export default Home;
