import BestPractice from './BestPractice';
import LimitedStockItem from './LimitedStockItem';
import PendingRequests from './PendingRequests';
import PieChartSection from './PieChartSection';
import RecognitionWall from './RecognationWall';
import TopRequestedItem from './TopRequestedItem';
const HRHome = () => {
  return (
    <div className="space-y-24">
      <PieChartSection />
      <PendingRequests />
      <TopRequestedItem />
      <LimitedStockItem />
      <RecognitionWall />
      <div className="pb-24">
        <BestPractice />
      </div>
    </div>
  );
};

export default HRHome;
