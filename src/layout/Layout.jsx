import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Fab } from '../components/Fab';
import { ModalPoll } from '../components/ModalPoll';
import { Navbar } from '../components/Navbar';
import { removeToken, setUser } from '../reducer/authSlice';
import { authApi } from '../services/authApi';

export const Layout = () => {
  const dispatch = useDispatch();
  const { token, user, shouldReset } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await dispatch(
          authApi.endpoints.getUser.initiate(token)
        ).unwrap();
        dispatch(setUser(fetchedUser));
      } catch (error) {
        dispatch(removeToken());
      }
    };

    if (token && !user) {
      fetchUser();
    }
  }, [dispatch, token, user]);

  if (!token && !user) return <Navigate to={'/login'} />;

  if (shouldReset) return <Navigate to={'/reset-password'} />;

  // if (token && !user) {
  //   dispatch(authApi.endpoints.getUser.initiate(token))
  //     .unwrap()
  //     .then((user) => dispatch(setUser(user)))
  //     .catch(() => {
  //       dispatch(removeToken());

  //       return <Navigate to={'/login'} />;
  //     });
  // }

  return (
    <>
      <main>
        <Navbar />
        <Outlet />
        {user?.role ==
          'admin' && (
            <>
              <ModalPoll />
              <Fab />
            </>
          )}
      </main>
    </>
  );
};
