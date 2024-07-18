const initialState = {
    listOptions: {
      skills: [],
      locations: [],
    },
  };
  
  const OptionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FILL_OPTIONS_DATA':
        return {
          ...state,
          listOptions: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default OptionsReducer;
  