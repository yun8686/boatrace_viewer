export const dateToString = (date: Date, format?: string) => {
  const year = `${date.getFullYear()}`
  const month = `${('0' + (date.getMonth() + 1)).slice(-2)}`
  const dd = `${('0' + date.getDate()).slice(-2)}`
  if (!format) {
    return `${year}${month}${dd}`
  } else {
    return format.replace('YYYY', year).replace('MM', month).replace('DD', dd)
  }
}

export const stringToDate = (str: string): Date =>
  new Date(
    parseInt(str.substring(0, 4)),
    parseInt(str.substring(4, 6)) - 1,
    parseInt(str.substring(6, 8)),
    -new Date().getTimezoneOffset() / 60
  )
