/**
 *
 * Apple
 *
 */
import * as React from 'react';
import { useFetchAppleQuery } from 'store/querySlice/apple.slice';

export function Apple() {
  const { data } = useFetchAppleQuery('0da40f5f-9a50-4d17-8d2d-37b91a3fe09d');
  return <div>{data?.type}</div>;
}
