import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useSignInMutation } from 'services';
import { setCredentials } from 'redux/authSlice';

import { Button } from '@mui/material';
import Toast from 'components/Toast/toast';
import { InputPassword, InputLogin, LinkAuthorization } from '../InputsForm';

import { AuthInfoType, ErrorResponse, UserSignUpType } from 'types';

import styles from '../authorization.module.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { error }] = useSignInMutation();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  });

  const onSubmit = async (dataLogin: AuthInfoType) => {
    await signIn(dataLogin)
      .unwrap()
      .then((data) => {
        localStorage.setItem('pma_token', data.token);
        dispatch(setCredentials(data));
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
        <h2>Sign In</h2>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLogin errors={errors.login} register={register} />
          <InputPassword
            errors={errors.password}
            register={register}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            showPassword={showPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Sign In
          </Button>
          <LinkAuthorization linkNames="sign-up" />
        </form>
      </div>
    </div>
  );
};
export default SignIn;