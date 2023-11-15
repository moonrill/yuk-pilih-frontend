import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { removeToken } from '../reducer/authSlice';
import { Fab } from '../components/Fab';
import { ModalPoll } from '../components/ModalPoll';
import { Navbar } from '../components/Navbar';
import { setUser } from '../reducer/authSlice';
import { authApi } from '../services/authApi';

export const Layout = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to={'/login'} />;

  if (token && !user) {
    dispatch(authApi.endpoints.getUser.initiate(token))
      .unwrap()
      .then((user) => dispatch(setUser(user)))
      .catch(() => {
        dispatch(removeToken());

        return <Navigate to={'/login'} />;
      });
  }

  return (
    <>
      <main>
        <Navbar />
        <ModalPoll />
        <Outlet />
        {user?.role == 'admin' ? <Fab /> : null}
      </main>
    </>
  );
};
