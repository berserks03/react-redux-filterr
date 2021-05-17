import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../reducers';

export const UseTypedSelector:TypedUseSelectorHook<RootState> = useSelector;
