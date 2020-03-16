import datefns from 'date-fns'

export default function formatDate (date) {
  if (date) {
    return datefns.format(new Date(date * 1000), 'DD/MM/YYYY')
  }

  return ' - '
}
