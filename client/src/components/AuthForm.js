import logo from 'assets/img/logo/logo.png';
import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { registerUser, loginUser } from '../_actions/user_actions';

function AuthForm(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onCofirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const isLogin = () => {
    return props.authState === STATE_LOGIN;
  };

  const isSignup = () => {
    return props.authState === STATE_SIGNUP;
  };

  const changeAuthState = authState => event => {
    event.preventDefault();
    props.onChangeAuthState(authState);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };
    if (isLogin()) {
      dispatch(loginUser(body)).then(res => {
        if (res.payload.loginSuccess) {
          window.localStorage.setItem('userId', res.payload.userId);
          window.localStorage.setItem('login', true);
          props.onLogoClick();
        } else {
          alert('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      });
    }
    if (isSignup()) {
      if (Password == ConfirmPassword) {
        dispatch(registerUser(body)).then(res => {
          if (res.payload.success) {
            props.onChangeAuthState(STATE_LOGIN);
          } else {
            alert('회원가입에 실패했습니다.');
            // console.log(res.payload);
          }
        });
      } else {
        alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      }
    }
  };

  const renderButtonText = () => {
    const { buttonText } = props;

    if (!buttonText && isLogin()) {
      return 'Login';
    }

    if (!buttonText && isSignup()) {
      return 'Signup';
    }

    return buttonText;
  };

  const onLogoClick = props.onLogoClick;
  const showLogo = true;

  return (
    <Form onSubmit={handleSubmit}>
      {showLogo && (
        <div className="text-center pb-4">
          <img
            src={logo}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer' }}
            alt="logo"
            onClick={onLogoClick}
          />
        </div>
      )}
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="your@email.com"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="your password"
        />
      </FormGroup>
      {isSignup() && (
        <FormGroup>
          <Label for="Confirm Password">Confirm Password</Label>
          <Input
            type="password"
            value={ConfirmPassword}
            onChange={onCofirmPasswordHandler}
            placeholder="confirm your password"
          />
        </FormGroup>
      )}
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          {isSignup() ? 'Agree the terms and policy' : 'Remember me'}
        </Label>
      </FormGroup>
      <hr />
      <Button
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
        onClick={handleSubmit}
      >
        {renderButtonText()}
      </Button>

      <div className="text-center pt-1">
        <h6>or</h6>
        <h6>
          {isSignup() ? (
            <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
              Login
            </a>
          ) : (
            <a href="#signup" onClick={changeAuthState(STATE_SIGNUP)}>
              Signup
            </a>
          )}
        </h6>
      </div>
    </Form>
  );
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

export default AuthForm;
