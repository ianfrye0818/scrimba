import './App.css';
import AboutSection from './Components/AboutSection';
import Hero from './Components/Hero';
import NavBar from './Components/NavBar';
import CardComponent from './Components/CardComponent';

function App() {
  return (
    <div className='app'>
      <NavBar />
      <main>
        <div className='container'>
          <Hero />
          <AboutSection />
          <CardComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
