export const timezoneOffset = (): number => (new Date()).getTimezoneOffset() * -1;

export const timestamp = (): number => (new Date()).getTime();