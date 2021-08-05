import * as moment from 'node_modules/moment/moment';

export const formatNumber = (num) => {
  if (num) return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  return '';
};

export const formatPhoneNumber = (phone) => {
  if (phone)
    return phone
      ?.toString()
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{3})/g, '$1 ')
      .trim();

  return '';
};

export const getDayCount = (inputDate) => {
  let inputTime = new Date(inputDate);
  return Math.round((new Date() - inputTime) / (1000 * 60 * 60 * 24));
};

export const getExpiryCount = (inputDate) => {
  let inputTime = new Date(inputDate);
  return Math.round((inputTime - new Date()) / (1000 * 60 * 60 * 24));
};

export const cleanObject = (obj) => {
  let propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const formatMonth = (date, t) => {
  let year = moment(Date.parse(date)).format('YYYY');
  let month = t(`common:month.${moment(Date.parse(date)).format('MMM')}`);
  return `${year} - ${month}`;
};

export const formatDate = (date, t) => {
  let year = moment(Date.parse(date)).format('YYYY');
  let days = moment(Date.parse(date)).format('DD');
  let month = t(`common:month.${moment(Date.parse(date)).format('MMM')}`);
  return `${year} ${month} ${days}`;
};

export const addDays = (date, days) => {
  if (!days) {
    return '-';
  }
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return moment(result).format('YYYY-MM-DD');
};

export const referralCode = () => {
  return 'xxxxxxx-xxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
