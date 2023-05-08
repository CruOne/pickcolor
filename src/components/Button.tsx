import React, { FC } from 'react';
import styled from 'styled-components';

const fuschia = '#ff0081';
const buttonBg = fuschia;
const buttonTextColor = '#fff';

const GenerateButton = styled.button`
  font-family: 'Helvetica', 'Arial', sans-serif;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  margin-bottom: 60px;
  -webkit-appearance: none;
  appearance: none;
  background-color: ${buttonBg};
  color: ${buttonTextColor};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);

  &:active{
    transform: scale(0.9);
    background-color: darken(${buttonBg}, 5%);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
`;

interface ButtonProps {
  handleClick: () => void;
}

export const Button: FC<ButtonProps> = ({ handleClick }) => (
  <GenerateButton onClick={handleClick}>
    Generate
  </GenerateButton>

);
