import * as actions from "../actions";

export const validationReducer = (validation = true, action) => {
  switch (action.type) {
    case actions.VALIDATION_ON:
      return true;
    case actions.VALIDATION_OFF:
      return false;
    default:
      return validation;
  }
};

export const pageReducer = (page = false, action) => {
  switch (action.type) {
    case actions.PAGE_ON:
      return true;
    case actions.PAGE_OFF:
      return false;
    default:
      return page;
  }
};
