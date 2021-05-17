import { FC, useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getCurrentEvent } from '../../actions/events';
import { capitalizeFirstLetter, defaultImageUrl } from '../../utils/helpers';
import './Card.scss';

const Card: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState({
    id: '',
    date: '',
    lead_image: '',
    type: '',
    title: '',
    full_text: '',
  });

  useEffect(() => {
    getCurrentEvent(id, setEvent);
  }, []);

  return (
    <div>
      {!event.id ? (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => history.push('/')}>Go to Main page</button>
          <div>No such ID</div>
        </div>
      ) : (
        <div className='card'>
          <button onClick={() => history.goBack()}>Go Back</button>
          <br />
          <div className='event-date'>Datums: {event.date}</div>
          <img
            src={event.lead_image ? event.lead_image : defaultImageUrl}
            alt={`event_${event.id}`}
          />
          <div className='event-type'>
            Tēma: {capitalizeFirstLetter(event.type)}
          </div>
          <h3 className='event-title'>{capitalizeFirstLetter(event.title)}</h3>
          <div className='event-full_text'>{capitalizeFirstLetter(event.full_text)}</div>
          <button onClick={() => history.push('/')}>Go to Main page</button>
        </div>
      )}
    </div>
  );
};

export default Card;
