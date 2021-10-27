import { useContext } from "react";
import { AppDetails } from "../utils/AppContext";
import ContactList from "../components/ContactList";

export default function Home() {
  //Access Global variables using useContext
  const {
    loading,
    contacts,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    AddContact,
    buttonText,
  } = useContext(AppDetails);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="home-container">
          <div className="home-top1-container">
            <h2>Contact Manager</h2>
          </div>
          <div className="home-top2-container">
            <div className="top2-inner-container">
              <input
                type="text"
                required
                placeholder="name"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <button onClick={() => AddContact()}>{buttonText}</button>
            </div>
          </div>
          <div className="home-body">
            {contacts.length > 0 ? (
              <>
                {contacts
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    return <ContactList contact={item} key={index} />;
                  })}
              </>
            ) : (
              <div className="home-body-empty">
                <h2>Empty Contact List</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

//To start the database, run "npm run db" in terminal
