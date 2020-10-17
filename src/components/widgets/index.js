import React from 'react';
import {  makeStyles } from '@material-ui/core';

import { WidgetNavigation } from './WidgetNavigation';
import { WidgetZoom } from './WidgetZoom';
import { WidgetRandomCountry } from './WidgetRandomCountry';
export {
  WidgetNavigation, WidgetZoom, WidgetRandomCountry
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  widgets: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: spacing(1),
    },
    /* Position in the right bottom corner of relative parent */
    position: 'absolute',
    bottom: spacing(2),
    right: spacing(2),
    [breakpoints.down('md')]: {
      bottom: 0,
      right: 0,
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  }
}));

export const Widgets = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.widgets}>
      {children}
    </div>
  )
}