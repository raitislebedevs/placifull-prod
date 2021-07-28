import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { loginSuccess, logout } from '../actions';
import { useRouter } from 'next/router';
import { UserServices } from '../services';
import { LoadingOverlay } from 'components/common';

/**
 * Protect private routes
 * @param {Component} Component
 * Must always come with redux connect with isLogged, user props in the parent Component
 * Example: connect(privateRouteMap)(PrivateRoute(Component))
 */

export const PrivateRoute = (Component) => {
  return (props) => {
    const { dispatch, isLogged } = props;
    const router = useRouter();

    useEffect(() => {
      if (!isLogged) {
        let token = Cookies.get('access_token');
        if (token) {
          getCurrentUser(token);
        } else {
          dispatch(logout());
          router.push('/sign-in');
        }
      }
    }, [isLogged]);

    const getCurrentUser = async (token) => {
      try {
        let { data, error } = await UserServices.GET_ME();
        if (error) throw error;
        dispatch(loginSuccess(data));
      } catch (e) {
        dispatch(logout());
        router.push('/sign-in');
      }
    };

    if (isLogged) {
      return <Component {...props} />;
    } else {
      return <LoadingOverlay />;
    }
  };
};

export const privateRouteMap = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  user: state.connectionReducer.user,
});
