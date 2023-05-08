import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModeToggler } from '@/components/ModeToggler';
import { Modes } from '@/enums/Modes';
import { getRandomColor } from '@/utils/getRandomColor';
import { HexCode } from '@/components/HexCode';
import { getRandomPastelColor } from '@/utils/getRandomPastelColor';
import { getRandomDarkColor } from '@/utils/getRandomDarkColor';
import { Button } from '@/components/Button';

const colorGenerators = {
  [Modes.LIGHT]: getRandomPastelColor,
  [Modes.DARK]: getRandomDarkColor,
  [Modes.RANDOM]: getRandomColor,
};

const Styles = styled.div<{color: string}>`
  background-color: ${({ color }) => color};
  transition: background-color 150ms;
  height: 100vh;
  font-family: 'monospaceFont';

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

export default function Home() {
  const [mode, setMode] = useState(Modes.LIGHT);
  const [lightControls, setLightControls] = useState(false);
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const changeMode = (id: Modes) => {
    setMode(id);
  };

  const handleClickGenerate = () => {
    setColor(colorGenerators[mode]());
    setLightControls(mode !== Modes.LIGHT);
  };

  return (
    <Styles color={color}>
      <ModeToggler mode={mode} changeMode={changeMode} lightControls={lightControls} />
      <div className="gen-block">
        <HexCode code={color} lightControls={lightControls} />
        <Button handleClick={handleClickGenerate} />
      </div>
    </Styles>
  );
}
