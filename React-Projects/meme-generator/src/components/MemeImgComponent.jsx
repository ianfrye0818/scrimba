import { useEffect, useState } from 'react';
import fetchMemes from '../../fetchMemes';

const MemeImgComponent = ({ sharedData, triggerEffect, setTriggerEffect }) => {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memes = await fetchMemes();
        setImagePath(
          memes.data.memes[Math.floor(Math.random() * memes.data.memes.length)]
            .url
        );
      } catch (error) {
        console.error('Error fetching memes ' + error);
      }
    };
    if (triggerEffect) {
      fetchData();
      setTriggerEffect(false);
    }
  }, [triggerEffect]);

  return (
    <section className="meme-img-component container">
      {imagePath && <img src={imagePath} alt="" />}
      <div className="top-text">{sharedData.topInputText}</div>
      <div className="bottom-text">{sharedData.bottomInputText}</div>
    </section>
  );
};

export default MemeImgComponent;
