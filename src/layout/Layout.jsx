import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Fab } from '../components/Fab';
import { Navbar } from '../components/Navbar';
import { setUser } from '../reducer/authSlice';
import { authApi } from '../services/authApi';
import { ModalPoll } from '../components/ModalPoll';

export const Layout = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  if (token && !user) {
    dispatch(authApi.endpoints.getUser.initiate(token))
      .unwrap()
      .then((user) => dispatch(setUser(user)));
  }

  if (!token && !user ) return <Navigate to={'/login'} />;

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
