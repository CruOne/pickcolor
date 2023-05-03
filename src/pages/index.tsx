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
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
  align-items: center;
  .gen-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const GenerateButton = styled.button`
  width: 200px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #ccc;
  }
  :active {
    background-color: #cdfcff;
  }
  transition: background-color 500ms;
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
      <ModeToggler mode={mode} changeMode={changeMode} />
      <div className="gen-block">
        <HexCode code={color} />
        <GenerateButton onClick={() => { setColor(colorGenerators[mode]()); }}>
          Generate Color
        </GenerateButton>
      </div>
    </Styles>
  );
}
