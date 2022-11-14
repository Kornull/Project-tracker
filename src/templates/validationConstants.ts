export const RegExpPasswordValidation =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8,}$/;

export const RegExpLoginValidation = /^[a-z]+([-_]?[a-z0-9]+){0,2}|[а-я]+([-_]?[а-яё0-9]+){0,2}$/i;

export const RegExpNameValidation =
  /^((?!\s{2}).)*[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']+( [^ ]+[a-zA-Zа-яА-ЯёЁ']{})\s|^((?!\s{2}).)*[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']$/;