// src/redux/actions/OptionsActions.js
export const FillOptionData = (value) => {
  console.log('Dispatching FILL_OPTIONS_DATA with value:', value); // בדיקת הנתונים שנשלחים ל-redux

    return {
      type: 'FILL_OPTIONS_DATA',
      payload: value
    };
  };

  