import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup"

const contactSchemaValidation=Yup.object().shape(
  {
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required"),

  }
);

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={isUpdate ? {
            name: contact?.name || "",
            email: contact?.email || "",
          } : {
            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            if (isUpdate && contact?.id) {
              updateContact(values, contact.id);
            } else {
              addContact(values);
            }
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10" />
              <div className="text-red-500 text-xs">
                  <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="border h-10" />
              <div className="text-red-500 text-xs">
                  <ErrorMessage name="email"/>
              </div>
            </div>
            <button type="submit" className="bg-orange px-3 py-1.5 border self-end">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default AddAndUpdateContact;
