import PropTypes from 'prop-types';

import { FaStar } from 'react-icons/fa';

const Card = ({ data }) => {
  const {
    coverImg,
    stats: { rating, reviewCount },
    location,
    title,
    price,
    openSpots,
  } = data;
  return (
    <div className="card">
      <img
        src={`/src/assets/images/${coverImg}`}
        alt="A photo of someone having fun on vacation"
      />
      <div className="card-top-section">
        <FaStar /> {rating} ({reviewCount}) • {location}
      </div>
      <h3 className="title-section">{title}</h3>
      <div className="card-bottom-section">
        <span>From ${price}</span> / person
      </div>
      <div className="card-availability">
        {openSpots > 0 ? 'ONLINE' : 'SOLD OUT'}
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    coverImg: PropTypes.string.isRequired,
    rating: PropTypes.string,
    reviewCount: PropTypes.string,
    location: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    openSpots: PropTypes.number,
  }),
};

export default Card;
