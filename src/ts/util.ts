export function isWeatherDataOutdated(updatedAt: number) {
  const expirationPeriod = 10 * 60 * 1000; // 10 min

  return updatedAt + expirationPeriod > Date.now() ? true : false;
}
