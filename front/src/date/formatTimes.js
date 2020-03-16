import datefns from 'date-fns'
import { formatToTimeZone } from 'date-fns-timezone'

export default function formatTimestampDate (date) {
  if (date) {
    return datefns.getTime(formatToTimeZone(
      date,
      'M.D.YYYY HH:mm:ss.SSS [GMT]Z (z)',
      { timeZone: 'GMT+0' })) / 1000
  }

  return null
}
