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
  position: relative;

  width: ${({ width }) => width}px;
  padding: 10px;

  .modes {
    position: relative;
    display: flex;
    z-index: 2;
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
  width: ${iconSize + 20}px;
  height: ${iconSize + 20}px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 50%;
  z-index: 1;
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
