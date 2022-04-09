import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = ()=>{
    return(
        <ToastContainer
          position='bottom-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          rtl={false}
          pauseOnHover
        />
    )
}

export default Toast