import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import sunIcon from '../../public/sun.svg';
import moonIcon from '../../public/moon.svg';
import starIcon from '../../public/star.svg';
import { getEnumLength } from '@/utils/getEnumLength';
import { Modes } from '@/enums/Modes';

const itemsTotal = getEnumLength(Modes);
const iconSize = 60;
const togglerWidth = 270;
const itemsGap = (togglerWidth - iconSize * itemsTotal) / (itemsTotal - 1);

const icons = [
  {
    id: Modes.LIGHT, src: sunIcon, alt: 'sun', width: iconSize,
  },
  {
    id: Modes.DARK, src: moonIcon, alt: 'moon', width: iconSize,
  },
  {
    id: Modes.RANDOM, src: starIcon, alt: 'star', width: iconSize,
  },
];

const Styles = styled.div<{width: number}>`
  display: relative;
  width: ${({ width }) => width}px;
  padding: 10px;

  .modes {
    display: flex;
    justify-content: space-between;
  }

  .img {
    cursor: pointer;
    z-index: 1;
  }
`;

interface ModeTogglerProps {
  mode: Modes
  changeMode: (mode: Modes) => void
  lightControls: boolean
}

const Selector = styled.div <Pick<ModeTogglerProps, 'mode' | 'lightControls'>>`
  margin: -10px;
  transform: translateX(${({ mode }) => iconSize * mode + itemsGap * mode}px);
  position: absolute;
  width: ${iconSize + 20}px;
  height: ${iconSize + 20}px;
  border-radius: 50%;
  transition: transform 200ms;
  background-color: ${({ lightControls }) => (lightControls ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)')};
`;

export const ModeToggler: FC<ModeTogglerProps> = ({
  mode, changeMode, lightControls,
}) => (
  <Styles width={togglerWidth}>
    <Selector mode={mode} lightControls={lightControls} />
    <div className="modes">
      {
        icons.map((icon) => (
          <Image
            className="img"
            key={icon.id}
            src={icon.src}
            alt={icon.alt}
            width={icon.width}
            onClick={() => { changeMode(icon.id); }}
          />
        ))
      }
    </div>
  </Styles>
);
