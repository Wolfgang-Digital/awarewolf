const capitaliseWord = word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const formatName = string => {
  const names = string.split(' ');
  let first = capitaliseWord(names[0]);
  if (names[1]) {
    first += ` ${names[1].slice(0, 1).toUpperCase()}`;
  }
  return first;
};

const hyperlink = text => {
  return text.replace(
    /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)))(">(.*)<\/a>)?/gi, function () {
      return '<a href="' + arguments[2] + '" target="_blank">' + (arguments[7] || arguments[2]) + '</a>';
    });
};

export {
  capitaliseWord,
  formatName,
  hyperlink
};