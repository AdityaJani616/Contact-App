import React from 'react'
import ContactImage from '../assets/contact.png'
const NotFoundContact = () => {
  return (
    <div className='flex gap-4 justify-center items-center h-[80vh]'>
        <div>
        <img src={ContactImage}/>
        </div>

 <h3 className='text-white text-2xl font-semibold'>Contact Not Found</h3>
    </div>
  )
}
export default NotFoundContact
