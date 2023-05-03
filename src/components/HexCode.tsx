import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import copyIcon from '../../public/copy.svg';
import doneIcon from '../../public/check-mark.svg';
import { putToClipboard } from '@/utils/putToClipboard';

const hoverColor = 'invert(83%) sepia(7%) saturate(154%) hue-rotate(71deg) brightness(86%) contrast(79%)';

const Styles = styled.div<{copied: boolean}>`
  display: flex;
  img {
    cursor: pointer;
  ${({ copied }) => (
    copied
      ? '' : `
        :hover {
          filter: ${hoverColor};
        };
        `
  )}
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
    <Styles copied={copied}>
      <div style={{ fontSize: '30px' }}>
        {code}
      </div>
      <Image src={copied ? doneIcon : copyIcon} alt="copy" width={30} onClick={handleCopyClick} />
    </Styles>
  );
};
