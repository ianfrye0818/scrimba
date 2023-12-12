import { useEffect, useState } from 'react';

const FormComponent = ({ setSharedData, onSubmitButtonClick }) => {
  const [topInputText, setTopInputText] = useState('');
  const [bottomInputText, setBottomInputText] = useState('');

  useEffect(() => {
    setSharedData((prevSharedData) => {
      if (
        prevSharedData.topInputText !== topInputText ||
        prevSharedData.bottomInputText !== bottomInputText
      ) {
        return {
          ...prevSharedData,
          topInputText,
          bottomInputText,
        };
      }
      return prevSharedData;
    });
  }, [topInputText, bottomInputText, setSharedData]);

  const handleTopInputChange = (e) => {
    setTopInputText(e.target.value);
  };
  const handleBottomInputChange = (e) => {
    setBottomInputText(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmitButtonClick();
    setBottomInputText('');
    setTopInputText('');
    setSharedData({});
  };

  return (
    <div className="form-component container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-component--form">
          <div className="form-component--top-text">
            <label htmlFor="top-text-input" className="label">
              Top text
            </label>
            <input
              type="text"
              id="top-text-input"
              className="input form-component--top-text--top-text-input"
              placeholder="Shut up"
              value={topInputText}
              onChange={handleTopInputChange}
            />
          </div>
          <div className="form-component--bottom-text">
            <label htmlFor="bottom-text-input" className="label">
              Bottom text
            </label>
            <input
              type="text"
              id="bottom-text-input"
              className="input form-component--bottom-text--bottom-text-input"
              placeholder="And take my money"
              value={bottomInputText}
              onChange={handleBottomInputChange}
            />
          </div>
        </div>
        <button id="submit" className="btn submit-btn">
          Get a new meme image 🖼️
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
