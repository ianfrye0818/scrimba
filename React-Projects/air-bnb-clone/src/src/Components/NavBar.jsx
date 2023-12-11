import airbnblogo from '../assets/images/airbnb.png';

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <a href='#'>
          <img src={airbnblogo} alt='air bnb logo' />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
