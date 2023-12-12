import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <img src={logo} alt='Logo' />
        <h1>
          <a href='#'> Meme Generator</a>
        </h1>
        <h2>React Course - Project 3</h2>
      </div>
    </header>
  );
};

export default Header;
