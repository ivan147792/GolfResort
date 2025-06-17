import {useState} from 'react'
import Login from './components/Login/Login'
import Modal from './ui/Modal';
import Navbar from './components/Navbar/Navbar'
import { useModal } from "./ui/ModalContext";
import Register from './components/Register/Register'

const App = () => {
  const [logRegister, setLogRegister] = useState('login')
  return (
    <>
    <Navbar/>
      <Modal>
        {logRegister === 'login' ? <Login/> : <Register/>}
      </Modal>
    </>
  );
}

export default App;
