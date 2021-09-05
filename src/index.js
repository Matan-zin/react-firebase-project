import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import ErrorBoundary from './halpers/ErrorBoundary'

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
