import React from 'react';
import clsx from 'clsx';
import { makeStyles, Button } from '@material-ui/core/';

const useStyles = makeStyles(({ shadows, shape, palette }) => ({
  root: {
    width: 29,
    height: 29,
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    borderRadius: shape.borderRadius,
    fontSize: '1.3rem',
  },
  shadow: {
    boxShadow: shadows['11'],
    '&:hover': {
      boxShadow: shadows['11'],
    },
  },
  /* Remove shadow because it overlap neighbor buttons */
  disableShadow: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  up: {
    gridArea: 'up',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  down: {
    gridArea: 'down',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  left: {
    gridArea: 'left',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  right: {
    gridArea: 'right',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  center: {
    gridArea: 'center',
    borderRadius: 0,
    border: `1px solid ${palette.primary.dark}`,
  },
}));

export const ButtonBase = ({
  className,
  gridArea,
  disableShadow = false,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      variant="contained"
      className={clsx(
        classes.root,
        classes[gridArea],
        {
          [classes.disableShadow]: disableShadow,
          [classes.shadow]: !disableShadow,
        },
        className
      )}
      {...other}
    />
  );
};
