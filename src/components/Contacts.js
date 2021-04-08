import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {
  const [contactObjects, setContactObjects] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setContactObjects(snapshot.val());
      } else {
        setContactObjects({});
      }
    });
  }, []);

  const addOrEdit = (obj, setValues, initialStateValues) => {
    if (currentId === "") {
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.error("error == ", err);
        else {
          console.log("Submitted == ", obj);
          setValues(initialStateValues);
          setCurrentId("");
        }
      });
    } else {
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.error("error == ", err);
        else {
          console.log("updated == ", obj);
          setValues(initialStateValues);
          setCurrentId("");
        }
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure, you wanna delete")) {
      firebaseDb.child(`contacts/${key}`).remove((err) => {
        if (err) console.error("error == ", err);
        else {
          console.log("Record Deleted");
          setCurrentId("");
          Object.keys(contactObjects).filter((id) => id !== key);
        }
      });
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          {/* <ContactForm addOrEdit={addOrEdit} currentId={currentId} contactObjects={contactObjects}/> */}
          <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {Object.keys(contactObjects).map((id) => (
                <tr key={id}>
                  <th>{contactObjects[id].fullname}</th>
                  <th>{contactObjects[id].mobile}</th>
                  <th>{contactObjects[id].email}</th>
                  <th>
                    <button
                      className="btn btn-primary"
                      onClick={() => setCurrentId(id)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="btn btn-danger" 
                        onClick={() => onDelete(id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </th>
                </tr>
              ))} */}
              {/* OR */}
              {Object.values(contactObjects).map((item, index) => (
                <tr key={index}>
                  <td>{item.fullname}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        setCurrentId(Object.keys(contactObjects)[index])
                      }
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        onDelete(Object.keys(contactObjects)[index])
                      }
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
