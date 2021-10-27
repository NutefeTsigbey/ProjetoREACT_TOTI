import { useState, createContext, useEffect } from "react";
import api from "./api";
import { useSnackbar } from "notistack";

export const AppDetails = createContext();

const AppContext = ({ children }) => {
  //Global Variables
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonText, setButtonText] = useState("Add");
  const [id, setID] = useState("");

  //Notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Function to Add Contact
  async function AddContact() {
    closeSnackbar();
    const data = {
      name: name,
      phone: phoneNumber,
    };

    if (name !== "" && phoneNumber !== "") {
      if (buttonText === "Add") {
        await api
          .post("contacts", data)
          .then(() => {
            getContacts();
            setPhoneNumber("");
            setName("");
            enqueueSnackbar("Contact added", { variant: "success" });
          })
          .catch(error => {
            console.log(error);
            enqueueSnackbar("Unable to add contact", { variant: "error" });
          });
      } else if (buttonText === "Update") {
        await api
          .put("contacts/" + id, data)
          .then(() => {
            setButtonText("Add");
            getContacts();
            setPhoneNumber("");
            setName("");
            enqueueSnackbar("Contact updated", { variant: "success" });
          })
          .catch(error => {
            console.log(error);
            enqueueSnackbar("Unable to update contact", { variant: "error" });
          });
      }
    } else {
      enqueueSnackbar("Please fill all camps", { variant: "warning" });
    }
  }

  //Delete function
  async function handleDelete(id) {
    closeSnackbar();
    await api
      .delete("contacts/" + id)
      .then(() => {
        enqueueSnackbar("Contact deleted", { variant: "success" });
        getContacts();
      })
      .catch(error => {
        console.log(error);
        enqueueSnackbar("Failed to delete contact", { variant: "error" });
      });
  }

  //Edit function
  function handleEdit(name, phone, id) {
    setButtonText("Update");
    setID(id);
    setName(name);
    setPhoneNumber(phone);
  }

  async function getContacts() {
    await api
      .get("contacts")
      .then(res => {
        console.log(res.data);
        setContacts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <AppDetails.Provider
      value={{
        contacts,
        setContacts,
        loading,
        setLoading,
        getContacts,
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
        buttonText,
        setButtonText,
        AddContact,
        handleDelete,
        handleEdit,
        id,
        setID,
      }}>
      {children}
    </AppDetails.Provider>
  );
};

export default AppContext;
