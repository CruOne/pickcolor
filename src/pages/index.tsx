import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModeToggler } from '@/components/ModeToggler';
import { Modes } from '@/enums/Modes';
import { getRandomColor } from '@/utils/getRandomColor';
import { HexCode } from '@/components/HexCode';
import { getRandomPastelColor } from '@/utils/getRandomPastelColor';
import { getRandomDarkColor } from '@/utils/getRandomDarkColor';

const colorGenerators = {
  [Modes.LIGHT]: getRandomPastelColor,
  [Modes.DARK]: getRandomDarkColor,
  [Modes.RANDOM]: getRandomColor,
};

const Styles = styled.div<{color: string}>`
  background-color: ${({ color }) => color};
  transition: background-color 150ms;
  height: 100vh;
  padding-top: 200px;
  .gen-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  
  &>div {
    display: flex;
    flex-direction: column;
    gap: 70px;
    justify-content: center;
    align-items: center;
  }
`;

const GenerateButton = styled.button`
  padding: 10px 40px;
  font-size: 17px;
  outline: none;
  border: none;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.2);

  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0,0.3);
  }

  &:active {
    transform: scale(1.02);
  }
  transition: background-color 0.2s ease-in-out;
`;

export default function Home() {
  const [mode, setMode] = useState(Modes.LIGHT);
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const changeMode = (id: Modes) => {
    setMode(id);
  };

  return (
    <Styles color={color}>
      <div>
        <ModeToggler mode={mode} changeMode={changeMode} />
        <div className="gen-block">
          <HexCode code={color} />
          <GenerateButton onClick={() => { setColor(colorGenerators[mode]()); }}>
            random
          </GenerateButton>
        </div>
      </div>
    </Styles>
  );
}
