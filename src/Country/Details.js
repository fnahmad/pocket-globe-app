import React from 'react';
import { useCountriesDetails } from './useCountryDetails';

export const Details = ({ alphaCode }) => {
  const details = useCountriesDetails(alphaCode);

  if (!details) return <div>Loading...</div>

  const { capital, currency, population, area, languages } = details;

  return (
    <ul>
      <li>Capital: {capital}</li>
      <li>Population: {population}</li>
      <li>Area: {area} km<sup>2</sup></li>
      <li>Currency: {currency}</li>
      <li>Languages: {languages.join(', ')}</li>
    </ul>
  )
}