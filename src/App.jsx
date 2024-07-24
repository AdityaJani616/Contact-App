import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { FiSearch } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase.js";
import useDisclose from "./hooks/useDisclose";
import ContactCard from "./Components/ContactCard.jsx";
import Modal from "./Components/Modal.jsx";
import AddAndUpdateContact  from "./Components/AddAndUpdateContact.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./Components/NotFoundContact.jsx";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onClose,onOpen}=useDisclose();
 
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef,(snapshot)=>{
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          //console.log(contactsLists); // Log the contacts list instead of the snapshot
          setContacts(contactsLists); // Set the contacts state with the fetched data
          return(contactsList);
        })
        
      } catch (error) {
        console.log(error);
      }
    };
    getContacts(); // Make sure to call the function here 
  }, []);
const filterContacts=(e)=>{
const value=e.target.value;
const contactsRef = collection(db, "contacts");
// const contactsSnapshot = await getDocs(contactsRef);
onSnapshot(contactsRef,(snapshot)=>{
  const contactsLists = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  //console.log(contactsLists); // Log the contacts list instead of the snapshot
 
  const filteredContacts=contactsLists.filter(contact=>contact.name.toLowerCase().includes(value.toLowerCase()))
  setContacts(filteredContacts); // Set the contacts state with the fetched data
  return(filteredContacts);
})
}
  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow">
          <FiSearch className="text-white text-3xl absolute ml-1" />
          <input
          onChange={filterContacts}
            type="text"
            className="text-white border bg-transparent border-white rounded-md h-10 flex-grow pl-9"
            placeholder="Search Contact"
          />
        </div>
        <CiCirclePlus className="text-white text-5xl cursor-pointer" onClick={onOpen} />
      </div>
      {/* for showing contacs */}
      <div className="mt-4 gap-3 flex flex-col">
        {contacts.length<=0 ?(<NotFoundContact/>): contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
        <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
<ToastContainer position="bottom-center"/>     
    </>
  );
};

export default App;
