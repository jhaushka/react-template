// src/pages/Report.js
import React, { useState } from 'react';
import './Styles/Report.css'; // Import global styles

function Report() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showVotePopup, setShowVotePopup] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState('');
  const [reports, setReports] = useState([
    {
      id: 1,
      submittedBy: 'User1',
      votes: 10,
      status: 'Open',
      details: 'This user harassed me by using offensive words on LinkedIn. It affected my mental health and led to self-doubt.'
    },
    {
      id: 2,
      submittedBy: 'User2',
      votes: 5,
      status: 'Open',
      details: 'I received many toxic comments on my Instagram post, which made me feel insecure and anxious.'
    },
    {
      id: 3,
      submittedBy: 'User3',
      votes: 15,
      status: 'Closed',
      details: 'Someone sent me threatening messages on Twitter, and it made me fear for my safety.'
    },
  ]);

  // Handle report submission
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully!');
    setShowReportForm(false);
  };

  // Handle voting
  const handleVote = (agree) => {
    const updatedReports = reports.map((report) =>
      report.id === selectedReportId
        ? { ...report, votes: agree ? report.votes + 1 : report.votes - 1 }
        : report
    );
    setReports(updatedReports);
    setShowVotePopup(false);
  };

  // Handle viewing report details
  const handleViewDetails = (details) => {
    setSelectedDetails(details);
    setShowDetailsPopup(true);
  };

  return (
    <div className="report-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-heading">Report Toxic Content and Let DAO Decide Your Fate!</h1>
        <div className="hero-buttons">
          <button className="button" onClick={() => setShowReportForm(true)}>
            Submit Report
          </button>
          <button className="button" onClick={() => alert('View Closed Reports')}>
            View Closed Reports
          </button>
        </div>
      </div>

      {/* DAO Voting Section */}
      <div className="dao-voting-section">
        <h2>DAO Voting Section</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Submitted By</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Action</th>
              <th>Details</th> {/* New column for View Details */}
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.submittedBy}</td>
                <td>{report.votes}</td>
                <td>{report.status}</td>
                <td>
                  {report.status === 'Open' && (
                    <button
                      className="button vote-button"
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setShowVotePopup(true);
                      }}
                    >
                      Vote Now
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="button details-button"
                    onClick={() => handleViewDetails(report.details)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Voting */}
      {showVotePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Do you agree with this complaint?</h3>
            <div className="popup-buttons">
              <button className="button popup-button yes" onClick={() => handleVote(true)}>
                Yes
              </button>
              <button className="button popup-button no" onClick={() => handleVote(false)}>
                No
              </button>
            </div>
            <br />
            <button className="button close-button" onClick={() => setShowVotePopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup for Report Details */}
      {showDetailsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-icon" onClick={() => setShowDetailsPopup(false)}>
              ×
            </button>
            <h3>Report Details</h3>
            <p>{selectedDetails}</p>
          </div>
        </div>
      )}

      {/* Popup Form for Submitting Report */}
      {showReportForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Submit a Report</h3>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label>Complaint:</label>
                <textarea
                  placeholder="Describe the toxic content..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Website where you faced the issue:</label>
                <input type="text" placeholder="Enter website URL" required />
              </div>
              <div className="form-group">
                <label>Username of the harasser:</label>
                <input type="text" placeholder="Enter username" required />
              </div>
              <div className="form-group">
                <label>Upload Screenshot:</label>
                <div className="custom-file-input">
                  <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    onChange={(e) => {
                      const fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
                      document.getElementById("file-name").textContent = fileName;
                    }}
                  />
                  <label htmlFor="screenshot">Choose File</label>
                  <div id="file-name" className="file-name">No file chosen</div>
                </div>
              </div>
              <button type="submit" className="button submit-button">
                Submit Report
              </button>
            </form>
            <br />
            <button className="button close-button" onClick={() => setShowReportForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;