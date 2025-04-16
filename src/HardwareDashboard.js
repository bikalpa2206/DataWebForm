import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import './App.css';

const HardwareDashboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddingDevice, setIsAddingDevice] = useState(false);

  const [form, setForm] = useState({
    serviceTag: "",
    deviceName: "",
    deviceType: "",
    brand: "",
    specification: "",
    assignedTo: "",
    employeeId: "",
    department: "",
    issueDate: "",
    returnDate: "",
    employeeEmail: "",
    notes: ""
  });

  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchServiceTag, setSearchServiceTag] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleAddDevice = async () => {
    const { serviceTag, deviceName, assignedTo, employeeId, issueDate } = form;

    if (!serviceTag || !deviceName || !assignedTo || !employeeId || !issueDate) {
      alert("Please fill in all required fields: Service Tag, Device Name, Assigned To, Employee ID, and Issue Date.");
      return;
    }

    try {
      await addDoc(collection(db, "devices"), form);
      setForm({
        serviceTag: "",
        deviceName: "",
        deviceType: "",
        brand: "",
        specification: "",
        assignedTo: "",
        employeeId: "",
        department: "",
        issueDate: "",
        returnDate: "",
        employeeEmail: "",
        notes: ""
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const dismissSuccess = () => {
    setShowSuccess(false);
    setIsAddingDevice(false);
  };

  const handleSearch = async () => {
    let q = collection(db, "devices");

    if (searchEmployeeId && searchServiceTag) {
      q = query(q,
        where("employeeId", "==", searchEmployeeId),
        where("serviceTag", "==", searchServiceTag)
      );
    } else if (searchEmployeeId) {
      q = query(q, where("employeeId", "==", searchEmployeeId));
    } else if (searchServiceTag) {
      q = query(q, where("serviceTag", "==", searchServiceTag));
    } else {
      alert("Please enter at least one search field.");
      return;
    }

    try {
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed: ", error);
      alert("Error while searching. Please try again.");
    }
  };

  return (
    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bgimg.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <header className="app-header">
        <img 
          src={process.env.PUBLIC_URL + '/images/viva.png'} 
          alt="VIVA Hardware Allocation" 
          className="title-image" 
        />
      </header>
      
      <div className="hardware-form">
        <h1>VIVA Hardware Allocation Form</h1>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Service Tag</label>
              <input
                type="text"
                name="serviceTag"
                value={form.serviceTag}
                onChange={handleChange}
                required
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label className="required">Device Name</label>
              <input
                type="text"
                name="deviceName"
                value={form.deviceName}
                onChange={handleChange}
                required
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label>Device Type</label>
              <input
                type="text"
                name="deviceType"
                value={form.deviceType}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label>Specification</label>
              <input
                type="text"
                name="specification"
                value={form.specification}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label className="required">Assigned To (Employee Name)</label>
              <input
                type="text"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                required
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label className="required">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                required
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label className="required">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={form.issueDate}
                onChange={handleChange}
                required
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group">
              <label>Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={form.returnDate}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Employee Email Address</label>
              <input
                type="email"
                name="employeeEmail"
                value={form.employeeEmail}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                disabled={showSuccess}
              />
            </div>
            
            <button 
              type="button" 
              onClick={handleAddDevice}
              className="submit-btn"
              disabled={showSuccess}
            >
              Add Device
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className="success-message">
            <p>Device added successfully!</p>
            <button 
              onClick={dismissSuccess}
              className="dismiss-btn"
            >
              OK
            </button>
          </div>
        )}

        {/* Search Section */}
        <div className="search-section" style={{ marginTop: "40px" }}>
          <h2>Search Devices</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
            <div className="form-group">
              <label>Search by Employee ID</label>
              <input
                type="text"
                value={searchEmployeeId}
                onChange={(e) => setSearchEmployeeId(e.target.value)}
                maxLength={10}
                style={{ width: "150px" }}
              />
            </div>

            <div className="form-group">
              <label>Search by Service Tag</label>
              <input
                type="text"
                value={searchServiceTag}
                onChange={(e) => setSearchServiceTag(e.target.value)}
                maxLength={10}
                style={{ width: "150px" }}
              />
            </div>

            <button onClick={handleSearch} className="submit-btn" style={{ width: "100px" }}>
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="results-table" style={{ marginTop: "20px" }}>
              <h3>Search Results</h3>
              <table>
                <thead>
                  <tr>
                    <th>Service Tag</th>
                    <th>Device Name</th>
                    <th>Assigned To</th>
                    <th>Employee ID</th>
                    <th>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((device) => (
                    <tr key={device.id}>
                      <td>{device.serviceTag}</td>
                      <td>{device.deviceName}</td>
                      <td>{device.assignedTo}</td>
                      <td>{device.employeeId}</td>
                      <td>{device.issueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HardwareDashboard;
