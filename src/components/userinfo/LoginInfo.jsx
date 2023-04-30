import React from 'react';
import styled from 'styled-components';
import { nicknameSchema, passwordSchema } from '../../schema';
import Unit from './Unit';
import SuccessAlert from '../auth/Alert';

const Container = styled.div`
  padding-top: 38px;
  max-width: 480px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  letter-spacing: -0.27px;
`;

const defaultValuesForNickname = {
  nickname: '',
};

const defaultValuesForPassword = {
  password: '',
  confirmPassword: '',
};

const LoginInfo = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);

  return (
    <Container>
      <Title>로그인 정보</Title>
      <Unit
        setIsSuccess={setIsSuccess}
        type="nickname"
        title="닉네임"
        formSchema={nicknameSchema}
        defaultValues={defaultValuesForNickname}
      />
      <Unit
        setIsSuccess={setIsSuccess}
        type="password"
        title="비밀번호"
        formSchema={passwordSchema}
        defaultValues={defaultValuesForPassword}
      />
      {isSuccess && <SuccessAlert type="edit" close={() => setIsSuccess(false)} />}
    </Container>
  );
};

export default LoginInfo;
