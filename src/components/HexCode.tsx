import React, { FC } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
`;

interface HexCodeProps {
  code: string
}

export const HexCode: FC<HexCodeProps> = ({ code }) => (
  <Styles>
    <div style={{ fontSize: '30px' }}>
      {code}
    </div>
  </Styles>
);
