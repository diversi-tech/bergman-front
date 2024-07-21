const initialState = {
  skills: [],
  locations: [],
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_OPTIONS_DATA':
      const skills = action.payload.filter(option => [2, 3, 4].includes(option.enumId));
      const locations = action.payload.filter(option => option.enumId === 1);
      return {
        ...state,
        skills,
        locations,
      };
    default:
      return state;
  }
};

export default OptionsReducer;
