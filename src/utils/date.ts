import { DateTime } from 'luxon';

export function getRelativeDate(date: string) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return DateTime.fromISO(date).setZone(timeZone).toRelative();
}
