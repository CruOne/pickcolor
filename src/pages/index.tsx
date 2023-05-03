import React, { useState } from 'react';
import { ModeToggler } from '@/components/ModeToggler';
import { Modes } from '@/enums/Modes';

export default function Home() {
  const [mode, setMode] = useState(Modes.LIGHT);

  const changeMode = (id: Modes) => {
    setMode(id);
  };

  return (
    <ModeToggler mode={mode} changeMode={changeMode} />
  );
}
