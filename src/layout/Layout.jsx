import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Fab } from '../components/Fab';
import { Navbar } from '../components/Navbar';
import { setUser } from '../reducer/authSlice';
import { authApi } from '../services/authApi';

export const Layout = () => {
  const dispatch = useDispatch();
  const {token, user} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  if(token === null) return <Navigate to={'/login'}/>

  dispatch(authApi.endpoints.getUser.initiate(token))
    .unwrap()
    .then((res) => dispatch(setUser(res)))
    .catch(() => dispatch(setUser(null)))
    .finally(() => setLoading(false));

  return (
    <>
      <main>
        <Navbar user={user} loading={loading}/>
        <Outlet />
        <Fab />
      </main>
    </>
  );
};
