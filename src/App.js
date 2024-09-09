import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Main />
      
      <Footer />
      
    </div>
  );
}

export default App;
