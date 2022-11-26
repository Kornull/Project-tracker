import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setCredentials } from 'redux/authSlice';
import { useDeleteUserByIdMutation, useSignInMutation, useUpdateUserByIdMutation } from 'services';
import { updateProfile } from './userPage.utils';
import { ErrorResponse, UserSignUpType } from 'types';

import Form from 'components/Forms/FormAuthorization';
import { Toast } from 'components';

import styles from './userPage.module.scss';

export enum ModalText {
  DELETE_USER = 'Delete user',
  DELETE = 'Are you sure you want to delete your account?',
  PROFILE_UPDATE = 'Profile update.',
}

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [updateUser, { error }] = useUpdateUserByIdMutation();
  const { id, login } = useAppSelector((state) => state.auth.user!);
  const [isMessageUser, setMessageUser] = useState('');

  const handleDeleteUser = async () => {
    localStorage.removeItem('pma_token');
    await deleteUser(id!);
    dispatch(logOut());
    navigate('/');
  };

  const onSubmit = async (dataUser: UserSignUpType) => {
    id &&
      updateUser(updateProfile(id, dataUser))
        .unwrap()
        .then(async () => {
          await signIn({
            login: dataUser.login,
            password: dataUser.password,
          })
            .unwrap()
            .then((data) => {
              localStorage.setItem('pma_token', data.token);
              dispatch(setCredentials(data));
              setMessageUser(ModalText.PROFILE_UPDATE);
            });
        })
        .catch(() => setMessageUser(''));
  };

  useEffect(() => {
    if (isMessageUser.length) {
      setTimeout(() => {
        setMessageUser('');
      }, 3000);
    }
  }, [isMessageUser]);

  return (
    <div className={styles.user}>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
      {!error && isMessageUser && <Toast message={isMessageUser} />}
      <div className={styles.userDescription}>
        <h2>Hi, {login && login.slice(0, 1).toUpperCase() + login.slice(1)}</h2>
        <p>This is your profile page.</p>
        <p>Here you can update your details or completely delete your account.</p>
      </div>
      <Form
        className={styles.userForm}
        onSubmit={onSubmit}
        formName="User page"
        formLink=""
        nameFiled={true}
        userPage={true}
        isConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserPage;
