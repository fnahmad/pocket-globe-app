import React from 'react';

import { makeStyles, ButtonGroup } from '@material-ui/core/';
import { ButtonBase } from './ButtonBase';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

const useStyles = makeStyles(({ shape }) => ({
  root: {
    borderRadius: shape.borderRadius,
    width: shape.buttonWidth,
  },
}));

export const WidgetZoom = ({ onClick }) => {
  const classes = useStyles();

  return (
    <ButtonGroup
      className={classes.root}
      orientation="vertical"
      variant="contained"
      color="primary"
    >
      <ButtonBase id="widget-zoom-in" label="Zoom in" onClick={onClick}>
        <AddIcon />
      </ButtonBase>
      <ButtonBase id="widget-zoom-out" label="Zoom out" onClick={onClick}>
        <RemoveIcon />
      </ButtonBase>
    </ButtonGroup>
  );
};
