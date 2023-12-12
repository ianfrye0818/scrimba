import { FaGlobeAmericas } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <nav className='navbar'>
        <div className='container'>
          <FaGlobeAmericas />
          <span>my travel journal.</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
