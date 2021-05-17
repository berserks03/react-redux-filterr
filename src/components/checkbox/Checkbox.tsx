import { FC } from 'react';
import './Checkbox.scss';
import {CheckboxInterface} from '../../types/types'

const Checkbox:FC<CheckboxInterface> = ({ eventType, checkedIds, handleCheck }) => {
  return (
    <div>
      <input
        type='checkbox'
        id={eventType}
        name={eventType}
        checked={checkedIds.has(eventType)}
        onChange={(e) => handleCheck(e.target)}
      />
      <label htmlFor={eventType}>{eventType}</label>
    </div>
  );
};

export default Checkbox;
