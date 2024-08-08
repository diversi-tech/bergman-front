// // History.test.jsx
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import History from './History';

// const mockStore = configureStore([]);

// describe('History Component', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       // הוסף כאן את מצב ה-Redux ההתחלתי שלך אם צריך
//     });
//   });

//   test('renders candidate details', async () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <History />
//         </Router>
//       </Provider>
//     );

//     // בדוק אם הטקסט "פרטי מועמד" מוצג
//     expect(screen.getByText(/פרטי מועמד/i)).toBeInTheDocument();
//   });

//   test('opens and closes add dialog', () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <History />
//         </Router>
//       </Provider>
//     );
// // 
//     // לחץ על כפתור ההוספה
//     fireEvent.click(screen.getByRole('button', { name: /הוסף/i }));

//     // בדוק אם הדיאלוג נפתח
//     expect(screen.getByText(/הוסף היסטוריה חדשה/i)).toBeInTheDocument();

//     // לחץ על כפתור הביטול
//     fireEvent.click(screen.getByRole('button', { name: /ביטול/i }));

//     // בדוק אם הדיאלוג נסגר
//     expect(screen.queryByText(/הוסף היסטוריה חדשה/i)).not.toBeInTheDocument();
//   });
// });
