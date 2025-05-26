const Navbar = ({ isMobile = false }) => {
    return (
      <nav className={`${isMobile ? 'p-6' : 'px-4 py-0 border border-[#eeeeee]'}`}>
        <ul className={`list-none ${isMobile ? 'flex flex-col gap-6 text-lg font-semibold' : 'flex gap-8 font-bold text-lg p-4'}`}>
          <li><a href="#">Men</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Brands</a></li>
          <li><a href="#">Notes</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  