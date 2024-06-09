import MyPendingRequest from './MyPendingRequest';
import NoticeSection from './NoticeSection';

const EmployeeHome = () => {
  return (
    <div>
      <div>
        <NoticeSection />
      </div>
      <div className='mt-28'>
        <MyPendingRequest />
      </div>
    </div>
  );
};

export default EmployeeHome;
