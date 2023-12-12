import Header from './components/Header';
import TravelCard from './components/TravelCard';

import data from './assets/data';

const App = () => {
  return (
    <>
      {/* header */}
      <Header />
      <main className='container'>
        {/* travel cards*/}
        {data.map((item, index) => (
          <TravelCard key={index} {...item} />
        ))}
      </main>
    </>
  );
};

export default App;
