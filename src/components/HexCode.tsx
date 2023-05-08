import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import copyIcon from '../../public/copy.svg';
import doneIcon from '../../public/check-mark.svg';
import { putToClipboard } from '@/utils/putToClipboard';

const hoverColor = 'invert(83%) sepia(7%) saturate(154%) hue-rotate(71deg) brightness(86%) contrast(79%)';
const darkColor = 'invert(0%) sepia(83%) saturate(7500%) hue-rotate(156deg) brightness(85%) contrast(111%)';
const lightColor = 'invert(100%) sepia(100%) saturate(0%) hue-rotate(214deg) brightness(102%) contrast(102%)';

const Hover = styled.div<{copied: boolean, lightControls: boolean}>`
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 250px;
  cursor: pointer;

  color: #FFF;
  transition: all 0.5s;
  position: relative;

  .code {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    font-weight: 500;
    margin-right: 10px;
    font-size: 30px;
    color: ${({ lightControls }) => (lightControls ? 'white' : 'black')};

    .codeText {
      min-width: 125px;
    }

    img {
      margin-left: 10px;
      filter: ${({ lightControls }) => (lightControls ? lightColor : darkColor)};
      ${({ copied }) => (
    copied
      ? '' : `
        :hover {
          filter: ${hoverColor};
        };
      `)}
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${({ lightControls }) => (lightControls ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)')};
    transition: all 0.3s;
  }
  &:hover::before {
    opacity: 0 ;
    transform: scale(0.5,0.5);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border: 1px solid ${({ lightControls }) => (lightControls ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)')};
    transform: scale(1.2,1.2);
  }
  &:hover::after {
    opacity: 1;
    transform: scale(1,1);
  }
`;

interface HexCodeProps {
  code: string
  lightControls: boolean
}

export const HexCode: FC<HexCodeProps> = ({ code, lightControls }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (copied) { return; }
    putToClipboard(code);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) { setTimeout(() => { setCopied(false); }, 1000); }
  }, [copied]);

  return (
    <Hover copied={copied} lightControls={lightControls} onClick={handleCopyClick}>
      <div className="code">
        <div className="codeText">{code}</div>
        <Image src={copied ? doneIcon : copyIcon} alt="copy" width={30} />
      </div>
    </Hover>
  );
};
