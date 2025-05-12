import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PassMaster.css";

const PassMaster = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ id: null, website: "", username: "", password: "" });
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/passwords");
      setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:5000/passwords/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/passwords", formData);
      }
      setFormData({ id: null, website: "", username: "", password: "" });
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  

  const handleEdit = (entry) => {
    setFormData(entry);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/passwords/${id}`);
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manager">
      <div className="headingText">
         <h2>PassMaster is a powerful password manager</h2>
      </div>
      
      <form>
        <input
          type="text"
          name="website"
          placeholder="Website or Application Name"
          value={formData.website}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          />       
        <button onClick={handleSave}>
          Save
        </button>
      </form>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Website / Application Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.website}</td>
                <td>{entry.username}</td>
                <td>{entry.password}</td>
                <td>
                  <button className="editbtn" onClick={() => handleEdit(entry)}>Edit</button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassMaster;
