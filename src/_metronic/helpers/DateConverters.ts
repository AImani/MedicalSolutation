import moment from 'jalali-moment'
import { DateObject } from '../partials/controls/types/dates'

export const DateObjToDate = (dateObj: DateObject) => {
  if (!dateObj) return ''

  return dateObj.year + '/' + dateObj.month + '/' + dateObj.day
}

export const FaObjToEnDateTime = (dateObj: DateObject) => {
  if (!dateObj) return null

  let persianDate = moment.from(DateObjToDate(dateObj), import.meta.env.VITE_APP_DATE!, 'YYYY/MM/DD')
  return persianDate.locale('en').format('YYYY-MM-DDTHH:mm:ss')
}

export const EnToFaObjDateTime = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en', 'YYYY-MM-DDTHH:mm:ss')
  return {
    year: +persianDate.format('YYYY'),
    month: +persianDate.format('MM'),
    day: +persianDate.format('DD'),
  }
}

export const EnToFaString = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en').locale("fa")
  return persianDate.format('YYYY') + persianDate.format('MM') + persianDate.format('DD')
}

export const EnToFaObjDate = (date: string | null): DateObject | null => {
  if (!date) return null

  let persianDate = moment
    .from(date, 'en', 'YYYY-MM-DDTHH:mm:ss')
    .locale(import.meta.env.VITE_APP_DATE!)
  return {
    year: +persianDate.format('YYYY'),
    month: +persianDate.format('MM'),
    day: +persianDate.format('DD'),
  }
}

export const FaToFaObjDate = (date: string) => {
  if (!!date == false) return null

  let persianDate = moment
    .from(date, import.meta.env.VITE_APP_DATE!, 'YYYY-MM-DD')
    .locale(import.meta.env.VITE_APP_DATE!)
  return {
    year: +persianDate.format('YYYY'),
    month: +persianDate.format('MM'),
    day: +persianDate.format('DD'),
  }
}

export const EnToFaDate = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en')
  return persianDate.locale(import.meta.env.VITE_APP_DATE!).format('YYYY-MM-DD')
}

export const EnToFaDateTime = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en')
  return persianDate.locale(import.meta.env.VITE_APP_DATE!).format('YYYY-MM-DD HH:mm')
}

export const EnToFaDateSlash = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en')
  return persianDate.locale(import.meta.env.VITE_APP_DATE!).format('YYYY/MM/DD')
}

export const EnToFaDateTimeSlash = (date: string) => {
  if (!date) return null

  let persianDate = moment.from(date, 'en')
  return persianDate.locale(import.meta.env.VITE_APP_DATE!).format('YYYY/MM/DD HH:mm')
}

export const FaStringDate = (date: string, spliter: string = '/') => {
  if (!date) return null

  let persianDate = moment.from(date, 'fa', 'YYYYMMDD')
  return persianDate.locale(import.meta.env.VITE_APP_DATE!).format('YYYY/MM/DD')
}

export const DateTitmeToString = (date: Date, split: string = '/') => {
  return moment.from(date.toString(), 'en').format(`YYYY${split}MM${split}DD`)
}

export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;

}

export const EntoEnIso = (date: Date) => {
  const dateObj = new Date(date);
  return dateObj.toISOString();
}

export const NumberToString = (date: string, split: string = '/') => {
  return `${date.substring(0, 4)}${split}${date.substring(4, 6)}${split}${date.substring(6, 8)}`
}
