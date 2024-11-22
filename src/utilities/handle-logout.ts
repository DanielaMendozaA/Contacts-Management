import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/features/userThunks';
import { AppDispatch } from '../redux/store';

const dispatch: AppDispatch = useDispatch<AppDispatch>();

export const handleLogout = async () => {
  dispatch(removeToken());
};
