'use client';

import { Bounce, ToastContainer as Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastGlobalStyle } from '@/components/Toast/style';

export default function ToastContainer() {
  return (
    <>
      <ToastGlobalStyle />
      <Toast
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable //allows swiping to dismiss
        pauseOnHover
        theme="dark" //prgress bar background gray
        transition={Bounce}
      />
    </>
  );
}
