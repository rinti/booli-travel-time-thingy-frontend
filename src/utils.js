import moment from 'moment';

const metersToKilometers = (meters) => {
  return Math.round(meters/1000)
}

const secondsToMinutes = (seconds) => {
  return Math.round(seconds/60)
}

const moneyFormat = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const formatDate = (date) => {
  return moment(date).format('ddd D MMM')
}


export { metersToKilometers, secondsToMinutes, moneyFormat, formatDate }
