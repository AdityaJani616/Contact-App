import React from 'react'
import { FcContacts } from "react-icons/fc";

const Navbar = () => {
  return (
    <div className='flex justify-center items-center h-[6opx] bg-white my-4 rounded-lg gap-2 text-xl font-medium py-2'>
     
     <FcContacts className='text-2xl'/>

        <h1> CONTACTS APP</h1>
     </div>
   
  )
}
export default Navbar