import NavItem from '../../../layouts/shared/Navbar/NavItem';

const HrNavItem = () => {
  return (
    <>
      <NavItem label={'Home'} address={'/'} />
      <NavItem label={'Asset List'} address={'/asset-list'} />
      <NavItem label={'Add Asset'} address={'/add-asset'} />
      <NavItem label={'My Employee List'} address={'/my-employee-list'} />
      <NavItem label={'Add Employee'} address={'/add-employee'} />
      {/* <NavItem label={'Home'} address={'/'} /> */}
    </>
  );
};

export default HrNavItem;
