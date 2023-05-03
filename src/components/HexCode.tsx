import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import copyIcon from '../../public/copy.svg';
import doneIcon from '../../public/check-mark.svg';
import { putToClipboard } from '@/utils/putToClipboard';

const hoverColor = 'invert(83%) sepia(7%) saturate(154%) hue-rotate(71deg) brightness(86%) contrast(79%)';

const Styles = styled.button<{copied: boolean}>`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-family: sans-serif;
  font-size: 20px;
  padding: 4px 18px;
  border-radius: 6px;
  outline: none;
  border: none;
  background-color: rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
  
  
    &:hover {
      background-color: rgba(0,0,0,0.3);
    }
  
    &:active {
      transform: scale(1.05);
    }
  
  &>div {
    margin-right: 12px;
    min-width: 80px;
  }
  img {
    cursor: pointer;
  }
`;

interface HexCodeProps {
  code: string
}

export const HexCode: FC<HexCodeProps> = ({ code }) => {
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
    <Styles copied={copied} onClick={handleCopyClick}>
      <div>
        {code}
      </div>
      <Image src={copied ? doneIcon : copyIcon} alt="copy" width={26} />
    </Styles>
  );
};
