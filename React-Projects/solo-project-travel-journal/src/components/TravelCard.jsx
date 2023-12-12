import PropTypes from 'prop-types';

import { FaLocationDot } from 'react-icons/fa6';

const TravelCard = (props) => {
  return (
    <section className='card'>
      <div className='card--img-container'>
        <img
          src={`${import.meta.env.BASE_URL}images/${props.image}`}
          alt={props.imageAlt}
        />
      </div>
      <div className='card--right-section'>
        <div className='card--right-section__top-line'>
          <span className='card--right-sesction__top-line__location'>
            <FaLocationDot className='location--icon' /> {props.location}
          </span>
          <a href={props.googleMapLink}>View on Google Maps</a>
        </div>
        <h1 className='card--right-section__title-line'>{props.title}</h1>
        <p className='card--right-section__date-line'>
          {props.startDate} - {props.endDate}
        </p>
        <p className='card--right-section__description-line'>{props.text}</p>
      </div>
    </section>
  );
};

TravelCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  location: PropTypes.string,
  googleMapLink: PropTypes.string,
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  text: PropTypes.string,
};

export default TravelCard;
