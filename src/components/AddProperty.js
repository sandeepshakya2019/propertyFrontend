import axios from "axios";

import React, { useState } from "react";

function AddProperty(props) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [size, setsize] = useState("");
  const [msg, setmsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !size) {
      return setmsg("Please Fill all the details");
    }
    try {
      const res = await axios.post("http://localhost:5000/api/property", {
        title,
        description,
        size,
      });

      settitle("");
      setdescription("");
      setsize("");
      setmsg(
        "Property Added Success , Click on Close OR click anywhere to Close the modal"
      );
      props.reload(true);
      console.log(res);
    } catch (err) {
      console.log(err);
      setmsg("Request is Failed try Again");
    }
  };
  return (
    <div className="container" onSubmit={(event) => handleSubmit(event)}>
      {msg && <p className="color mb-1">{msg}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="title">Title of the Property</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={(event) => {
              settitle(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="description"
            name="description"
            value={description}
            onChange={(event) => {
              setdescription(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="size"
            name="size"
            value={size}
            onChange={(event) => {
              setsize(event.target.value);
            }}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
