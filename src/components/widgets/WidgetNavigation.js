import React from 'react';

import {
  IoIosArrowUp as IconUp,
  IoIosArrowDown as IconDown,
  IoIosArrowBack as IconLeft,
  IoIosArrowForward as IconRight,
} from 'react-icons/io';
import { MyLocation as LocationIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/';
import { ButtonBase } from './ButtonBase';
import { ShadowHelper } from './ShadowHelper';

const useStyles = makeStyles({
  holder: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  },
});

export const WidgetNavigation = ({ onRotateClick, onCenterClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.holder}>
      <ButtonBase
        id="widget-rotate-up"
        label="Rotate up"
        gridArea="up"
        onClick={onRotateClick}
        disableShadow
      >
        <IconUp />
      </ButtonBase>
      <ButtonBase
        id="widget-rotate-down"
        label="Rotate down"
        gridArea="down"
        onClick={onRotateClick}
        disableShadow
      >
        <IconDown />
      </ButtonBase>
      <ButtonBase
        id="widget-selected-country"
        label="Show selected country"
        gridArea="center"
        onClick={onCenterClick}
        disableShadow
      >
        <LocationIcon />
      </ButtonBase>
      <ButtonBase
        id="widget-rotate-left"
        label="Rotate left"
        gridArea="left"
        onClick={onRotateClick}
        disableShadow
      >
        <IconLeft />
      </ButtonBase>
      <ButtonBase
        id="widget-rotate-right"
        label="Rotate right"
        gridArea="right"
        onClick={onRotateClick}
        disableShadow
      >
        <IconRight />
      </ButtonBase>
      <ShadowHelper />
    </div>
  );
};
