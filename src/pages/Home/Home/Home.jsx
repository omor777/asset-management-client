import Banner from '../Banner/Banner';
import Packages from '../Packages/Packages';

const Home = () => {
  return (
    <div className="container px-4 pt-40">
      <Banner />
      <div className="my-20">
        <Packages />
      </div>
    </div>
  );
};

export default Home;
