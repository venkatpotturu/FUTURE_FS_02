import { useEffect, useState } from "react";
import axios from "axios";

import styles from './Dashboard.module.css'; // Import CSS module

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use environment variable

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [noteInputs, setNoteInputs] = useState({});
  const [analytics, setAnalytics] = useState({
    total: 0,
    contacted: 0,
    converted: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    source: ''
  });
  const [newLeadErrors, setNewLeadErrors] = useState({});
  const [addingLead, setAddingLead] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') {
      setMessage(msg);
      setError(null);
    } else {
      setError(msg);
      setMessage(null);
    }
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/leads`);
      const fetchedLeads = res.data.data;
      setLeads(fetchedLeads);

      const total = fetchedLeads.length;
      const contacted = fetchedLeads.filter(l => l.status === "Contacted").length;
      const converted = fetchedLeads.filter(l => l.status === "Converted").length;

      setAnalytics({ total, contacted, converted });
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to fetch leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({
      ...newLead,
      [name]: value
    });
  };

  const handleAddNewLead = async (e) => {
    e.preventDefault();
    setAddingLead(true);
    setNewLeadErrors({});
    try {
      await axios.post(`${API_BASE_URL}/leads/add`, newLead);
      setNewLead({ name: '', email: '', source: '' });
      showMessage('New lead added successfully!');
      fetchLeads();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = {};
        err.response.data.errors.forEach(e => {
          errors[e.param] = e.msg;
        });
        setNewLeadErrors(errors);
      } else {
        showMessage('Failed to add new lead.', 'error');
      }
    } finally {
      setAddingLead(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/leads/${id}`, { status });
      showMessage(`Lead status updated to ${status}!`);
      fetchLeads();
    } catch (err) {
      console.error("Error updating status:", err);
      showMessage(`Failed to update status to ${status}.`, 'error');
    }
  };

  const updateNotes = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/leads/${id}`, { notes: noteInputs[id] });
      showMessage("Lead notes updated!");
      fetchLeads();
    } catch (err) {
      console.error("Error updating notes:", err);
      showMessage("Failed to update notes.", 'error');
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Lead Dashboard</h2>
      {loading && <p>Loading leads...</p>}
      {error && <p className={styles.messageError}>{error}</p>}
      {message && <p className={styles.messageSuccess}>{message}</p>}

      <div className={styles.analyticsContainer}>
        <div className={styles.analyticsCard}>
          <p>Total Leads</p>
          <span>{analytics.total}</span>
        </div>
        <div className={styles.analyticsCard}>
          <p>Contacted</p>
          <span>{analytics.contacted}</span>
        </div>
        <div className={styles.analyticsCard}>
          <p>Converted</p>
          <span>{analytics.converted}</span>
        </div>
      </div>

      <div className={styles.addLeadForm}>
        <h3>Add New Lead</h3>
        <form onSubmit={handleAddNewLead}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className={styles.formInput}
              value={newLead.name}
              onChange={handleInputChange}
              placeholder="Enter lead's name"
            />
            {newLeadErrors.name && <p className={styles.formError}>{newLeadErrors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={styles.formInput}
              value={newLead.email}
              onChange={handleInputChange}
              placeholder="Enter lead's email"
            />
            {newLeadErrors.email && <p className={styles.formError}>{newLeadErrors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Source</label>
            <input
              type="text"
              name="source"
              className={styles.formInput}
              value={newLead.source}
              onChange={handleInputChange}
              placeholder="e.g., Website, Referral"
            />
            {newLeadErrors.source && <p className={styles.formError}>{newLeadErrors.source}</p>}
          </div>
          <button type="submit" className={styles.formButton} disabled={addingLead}>
            {addingLead ? 'Adding...' : 'Add Lead'}
          </button>
        </form>
      </div>

      {!loading && leads.length > 0 && (
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Update</th>
              <th>Notes</th>
              <th>Created At</th>
              <th>Add Note</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>
                <td>
                  <button
                    onClick={() => updateStatus(lead._id, "Contacted")}
                    disabled={lead.status === "Contacted" || lead.status === "Converted"}
                    className={`${styles.actionButton} ${styles.actionButtonContacted}`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(lead._id, "Converted")}
                    disabled={lead.status === "Converted"}
                    className={`${styles.actionButton} ${styles.actionButtonConverted}`}
                  >
                    Converted
                  </button>
                </td>
                <td>{lead.notes}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className={styles.noteCell}>
                  <input
                    type="text"
                    placeholder="Add note"
                    className={styles.noteInput}
                    value={noteInputs[lead._id] || ""}
                    onChange={(e) => setNoteInputs({ ...noteInputs, [lead._id]: e.target.value })}
                  />
                  <button
                    onClick={() => updateNotes(lead._id)}
                    className={styles.saveNoteButton}
                  >
                    Save Note
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && leads.length === 0 && !error && (
        <p>No leads found. Add some leads to get started!</p>
      )}
    </div>
  );
}

export default Dashboard;
