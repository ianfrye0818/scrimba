import { useEffect, useState } from 'react';

import FormComponent from './components/FormComponent';
import Header from './components/Header';
import MemeImgComponent from './components/MemeImgComponent';

const App = () => {
  const [sharedData, setSharedData] = useState({});
  const [triggerEffect, setTriggerEffect] = useState(false);

  const handleSubmitButtonClick = () => {
    setTriggerEffect(true);
  };
  return (
    <div>
      <Header />
      <main>
        <FormComponent
          setSharedData={setSharedData}
          onSubmitButtonClick={handleSubmitButtonClick}
        />
        <MemeImgComponent
          sharedData={sharedData}
          triggerEffect={triggerEffect}
          setTriggerEffect={setTriggerEffect}
        />
      </main>
    </div>
  );
};

export default App;
