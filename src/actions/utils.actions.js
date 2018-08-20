export const VALIDATION_ON = "VALIDATION_ON";
export const VALIDATION_OFF = "VALIDATION_OFF";
export const PAGE_ON = "PAGE_ON";
export const PAGE_OFF = "PAGE_OFF";

export const validationOn = () => {
  return {
    type: VALIDATION_ON
  };
};

export const validationOff = () => {
  return {
    type: VALIDATION_OFF
  };
};

export const pageOn = () => {
  return {
    type: PAGE_ON
  };
};

export const pageOff = () => {
  return {
    type: PAGE_OFF
  };
};
