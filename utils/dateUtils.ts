export const dateToString = (date: Date) =>
  `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`

export const stringToDate = (str: string): Date =>
  new Date(
    parseInt(str.substring(0, 4)),
    parseInt(str.substring(4, 6)) - 1,
    parseInt(str.substring(6, 8)),
    -new Date().getTimezoneOffset() / 60
  )
