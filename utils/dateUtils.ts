export const dateToString = (date: Date) =>
  `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`

export const stringToDate = (str: string): Date =>
  new Date(
    parseInt(str.substring(0, 4)),
    parseInt(str.substring(4, 6)) - 1,
    parseInt(str.substring(6, 8)),
    -new Date().getTimezoneOffset() / 60
  )
