import MonthlyRequest from './MonthlyRequest';
import MyPendingRequest from './MyPendingRequest';
import NoticeSection from './NoticeSection';

const EmployeeHome = () => {
  return (
    <div>
      <div>
        <NoticeSection />
      </div>
      <div className="mt-28">
        <MyPendingRequest />
      </div>
      <div className="my-28">
        <MonthlyRequest />
      </div>
      {/* <Modal /> */}
    </div>
  );
};

export default EmployeeHome;
