import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EventActionCreators from '../actions/events';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(EventActionCreators, dispatch);
};
