import NavItem from '../../../layouts/shared/Navbar/NavItem';

const EmployeeNavItem = () => {
  return (
    <>
      <NavItem label={'Home'} address={'/'} />
      <NavItem label={'My Assets'} address={'/asset-list'} />
      <NavItem label={'My Team'} address={'/add-asset'} />
      <NavItem label={'Request for an Asset'} address={'/my-employee-list'} />
      <NavItem label={'Profile'} address={'/add-employee'} />
    </>
  );
};

export default EmployeeNavItem;
