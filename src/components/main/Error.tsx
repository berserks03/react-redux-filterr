import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Error: FC<RouteComponentProps> = ({ history }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => history.push('/')}>Go to Main page</button>
      Error
    </div>
  );
};

export default Error;
