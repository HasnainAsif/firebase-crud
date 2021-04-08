import React, { useEffect, useState } from "react";

const ContactForm = ({ addOrEdit, currentId, contactObjects }) => {
  const initialStateValues = {
    fullname: "",
    mobile: "",
    email: "",
    address: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, setValues, initialStateValues);
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      setValues(contactObjects[currentId]);
    }
  }, [currentId]);

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Full Name"
          name="fullname"
          value={values.fullname}
          onChange={onChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="mobile"
            name="mobile"
            value={values.mobile}
            onChange={onChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Address"
          name="address"
          value={values.address}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          className="btn btn-primary btn-block"
          type="submit"
          value={currentId === "" ? "save" : "update"}
        />
      </div>
    </form>
  );
};

export default ContactForm;
