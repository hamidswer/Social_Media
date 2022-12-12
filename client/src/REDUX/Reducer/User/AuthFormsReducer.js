const SET_VAL = "SET_VAL";
export const setVal = (val) => ({
  type: SET_VAL,
  val,
});

const defaultState = { val: 0 };
const AuthFormsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VAL: {
      return {
        ...state,
        val: action.val,
      };
    }
    default:
      return state;
  }
};
export default AuthFormsReducer;
