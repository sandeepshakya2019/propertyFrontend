import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import FormModel from "./components/FormModel";

function App() {
  const [property, setproperty] = useState([]);
  const [reload, setreload] = useState(false);
  const [ms, setms] = useState("");
  const [close, setclose] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/property").then((res) => {
      console.log(res.data.property);
      setproperty(res.data.property);
    });
  }, []);
  function setreloadQ(set) {
    setreload(set);
  }
  if (reload) {
    axios
      .get("http://localhost:5000/api/property")
      .then((res) => {
        setproperty(res.data.property);
        setms("");
        setclose(true);
      })
      .catch(() => {
        setms("Please Reload Again");
      });
    setreload(false);
  }
  const deleteProperty = (id) => {
    axios
      .delete(`http://localhost:5000/api/property/${id}`)
      .then((res) => {
        console.log(res);
        setms("Property Deleted");
        axios.get("http://localhost:5000/api/property").then((res) => {
          console.log(res.data.property);
          setproperty(res.data.property);
        });
      })
      .catch((err) => {
        console.log(err);
        setms("Error in Delete try again ");
      });
  };
  return (
    <div className="container">
      <h1>Property Dealer Management</h1>
      <br />
      {ms && <p className="color m-2">{ms}</p>}
      <table className="table table-bordered table-dark table-hover">
        <thead>
          <tr>
            <th>Title of the Property</th>
            <th>Description of the Property</th>
            <th>Size of the property</th>
            <th>Other Options</th>
          </tr>
        </thead>
        <tbody>
          {property.map((item) => (
            <tr key={item._id} className="table-success">
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.size}</td>
              <td>
                <btn
                  className="btn btn-danger"
                  onClick={() => {
                    deleteProperty(item._id);
                  }}
                >
                  Del
                </btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormModel reload={setreloadQ} close={close} />
    </div>
  );
}

export default App;
