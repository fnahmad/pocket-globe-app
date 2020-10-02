import React, { useEffect, useRef, memo, useMemo } from 'react';
import { geoPath, geoOrthographic, select, interpolate } from 'd3';

import { useData } from './useData';
import { dragBehaviour, zoomBehaviour } from './utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { makeStyles } from '@material-ui/core';
import { NULL } from 'node-sass';

const useStyles = makeStyles(
  ({ palette: { primary, background, getContrastText } }) => ({
    root: {
      display: 'block',
      margin: '0 auto',
    },
    country: {
      fill: background.default,
      '&:hover': {
        fill: primary.main,
      },
    },
    circle: {
      fill: getContrastText(background.default),
    },
  })
);

export const Globe = memo(
  ({ width = 600, height = 600, sensitivity = 75, onCountryClick }) => {
    const classes = useStyles();

    // Refs
    const svgRef = useRef(null);
    const svgContentRef = useRef(null);

    // Projection
    // useMemo is important here because we want to create a projection only once
    const projection = useMemo(
      () =>
        geoOrthographic()
          .scale(250)
          .center([0, 0])
          .rotate([0, -30])
          .translate([width / 2, height / 2]),
      [height, width]
    );
    // Initial scale
    const initialScale = projection.scale();

    // Path generator
    const path = geoPath().projection(projection);

    // Fetch TopoJSON data
    const [{ data, isLoading }] = useData({ resolution: 'low' });

    // Draw the globe
    useEffect(() => {
      if (!data) return;

      // Selectors
      const svg = select(svgRef.current);
      const svgContent = select(svgContentRef.current);
      const circle = svg.select(`.${classes.circle}`);
      const countries = svgContent.selectAll(`.${classes.country}`);

      // Apply zoom and drag
      svg
        // Drag
        .call(
          dragBehaviour({
            selection: countries,
            path,
            projection,
            sensitivity,
          })
        )
        // Zoom
        .call(
          zoomBehaviour({
            selection: countries,
            path,
            projection,
            circle,
            initialScale,
          })
        );

      const handleCountryClick = (e, d) => {

        console.log(e);

        // Store the current rotation and scale:
        const currentRotate = projection.rotate();

        // Get projected planar centroid (in pixels)
        const centroid = path.centroid(d);
        // Converts centroid to [longitude, latitude] in degrees
        const [longitude, latitude] = projection.invert(centroid);

        // Rotate the projection
        projection.rotate([-longitude, -latitude]);
        // Update path generator with new projection
        path.projection(projection);

        // Calculate next rotation
        const nextRotate = projection.rotate();

        // Create interpolator function
        const r = interpolate(currentRotate, nextRotate);
       
        // Update countries
        countries
          .transition()
          .attrTween('d', d => t => {
              projection.rotate(r(Math.pow(t, 0.33)));
              path.projection(projection);

              // When interpolator returns null, Chrome throws errors for
              // <path> with attribute d="null"
              const pathD = path(d);
              return pathD !== null ? pathD : "";
            })
          .duration(1000);

        onCountryClick(d.properties);
      };

      // Update countries
      countries
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', handleCountryClick);
    }, [
      data,
      path,
      projection,
      initialScale,
      sensitivity,
      onCountryClick,
      classes,
    ]);

    if (!data || isLoading) return <LoadingSpinner />;

    return (
      <svg ref={svgRef} className={classes.root} width={width} height={height}>
        <circle
          className={classes.circle}
          cx={width / 2}
          cy={height / 2}
          r={250}
        />
        <g className="content" ref={svgContentRef}>
          {data.features.map((feature) => (
            <path className={classes.country} key={feature.properties.name} />
          ))}
        </g>
      </svg>
    );
  }
);

