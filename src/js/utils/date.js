import moment from 'moment';

const formatDate = date => moment(date).format('DD.MM.YY h:mm a');

export {
  formatDate
};