import { GeneralProvider } from '../context/GeneralContext';
import Login from '../pages/Login';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Navbar />
        <Login />
        <Footer />
      </GeneralProvider>
    </BrowserRouter>
  );
}

export default App;