import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/palette';

const buttonStyle = css`
  border: none;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.4rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.red &&
    css`
      background: #d21312;
      &:hover {
        background: #a10303;
      }
    `}

  ${props =>
    props.gray &&
    css`
      color: #000;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      background: #fff;
      &:hover {
        background: #c4c2c2;
      }
    `}

  ${props =>
    props.full &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  &:disabled {
    background-color: transparent;
    border: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.2);
  }
`;

const CommonButton = styled.button`
  ${buttonStyle}
`;

const CommonLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => (props.to ? <CommonLink {...props} $red={props.red} /> : <CommonButton {...props} />);

export default Button;