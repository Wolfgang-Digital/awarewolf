const MIN_LENGTH = 6;
const MAX_LENGTH = 150;

export const validateForm = (title, questions) => {
  let errors = [];
  if (!title) {
    errors.push('Title cannot be blank.');
    return errors;
  }
  if (title.length < MIN_LENGTH) errors.push(`Title must be at least ${MIN_LENGTH} letters.`);
  if (title.length > MAX_LENGTH) errors.push(`Title must be no longer than ${MAX_LENGTH} letters.`);
  if (questions.length < 1) {
    errors.push('There must be at least 1 question.');
    return errors;
  }
  questions.forEach(q => {
    const questionErrors = validateQuestion(q);
    questionErrors.forEach(e => {
      if (!errors.includes(e)) errors.push(e);
    });
  });
  return errors;
};

export const validateQuestion = ({ text, type, options }) => {
  let errors = [];
  if (text.length < MIN_LENGTH) errors.push(`Questions must be at least ${MIN_LENGTH} letters.`);
  if (text.length > MAX_LENGTH) errors.push(`Questions must be no longer than ${MAX_LENGTH} letters.`);
  if (type === 'multiple') {
    if (options.length < 2) errors.push('There must be at least 2 options.');
    if (options.some(o => o.trim().length < 1)) errors.push('Options must be at least 1 letter.');
  }
  return errors;
};