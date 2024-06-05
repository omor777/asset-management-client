import AssetInventoryOverview from './AssetInventoryOverview';
import LimitedStockItem from './LimitedStockItem';
import PendingRequests from './PendingRequests';
import TopRequestedItem from './TopRequestedItem';

const HRHome = () => {
  return (
    <div className="space-y-20">
      <AssetInventoryOverview />
      <PendingRequests />
      <TopRequestedItem />
      <LimitedStockItem />
    </div>
  );
};

export default HRHome;
