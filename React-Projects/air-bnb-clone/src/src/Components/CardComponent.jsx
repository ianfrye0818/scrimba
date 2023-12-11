import Card from './Card';
import dataArray from '../assets/data.js';

const CardComponent = () => {
  return (
    <section className="card-component">
      {dataArray.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </section>
  );
};

export default CardComponent;
