import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import sunIcon from '../../public/sun.svg';
import moonIcon from '../../public/moon.svg';
import starIcon from '../../public/star.svg';
import { getEnumLength } from '@/utils/getEnumLength';
import { Modes } from '@/enums/Modes';

const itemsTotal = getEnumLength(Modes);
const iconSize = 80;
const togglerWidth = 360;
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
  }
`;

const Selector = styled.div<{itemIdx: number}>`
  margin: -10px;
  transform: translateX(${({ itemIdx }) => iconSize * itemIdx + itemsGap * itemIdx}px);
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid black;
  transition: transform 200ms;
`;

interface ModeTogglerProps {
  mode: Modes
  changeMode: (mode: Modes) => void
}

export const ModeToggler: FC<ModeTogglerProps> = ({ mode, changeMode }) => (
  <Styles width={togglerWidth}>
    <Selector itemIdx={mode} />
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
