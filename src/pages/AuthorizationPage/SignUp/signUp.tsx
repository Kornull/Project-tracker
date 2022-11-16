import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Toast from 'components/Toast/toast';

import { InputPassword, InputName, InputLogin, LinkAuthorization } from '../InputsForm';
import { useAppDispatch } from 'redux/hooks';
import { useSignInMutation, useSignUpMutation } from 'services';
import { useState } from 'react';
import { setCredentials } from 'redux/authSlice';

import { ErrorResponse, UserSignUpType } from 'types';

import styles from '../authorization.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signUp, { error }] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (dataUser: UserSignUpType) => {
    await signUp(dataUser)
      .unwrap()
      .then(async (data) => {
        await signIn({
          login: data.login,
          password: dataUser.password,
        })
          .unwrap()
          .then((data) => {
            localStorage.setItem('pma_token', data.token);
            dispatch(setCredentials(data));
          });
        navigate('/');
      })
      .catch(() => {
        localStorage.removeItem('pma_token');
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Sign Up</h2>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputName errors={errors.name} register={register} />
          <InputLogin errors={errors.login} register={register} />
          <InputPassword
            errors={errors.password}
            register={register}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            showPassword={showPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Sign Up
          </Button>
          <LinkAuthorization linkNames="sign-in" />
        </form>
      </div>
    </div>
  );
};
export default SignUp;
