import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { uploadLogs } from "../services/logService";
import { getApiError } from "../services/api";
import Footer from "../components/Footer";

function UploadLogs() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setMessage("");
    setStatus("");
    setProgress(0);

    if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".csv")) {
      setFile(null);
      setStatus("error");
      setMessage("Only CSV files are supported.");
      return;
    }

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setStatus("error");
      setMessage("The selected file is larger than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Select a CSV file before starting the upload.");
      return;
    }

    setUploading(true);
    setMessage("");
    setStatus("");

    try {
      const data = await uploadLogs(file, (event) => {
        if (event.total) setProgress(Math.round((event.loaded / event.total) * 100));
      });
      setStatus("success");
      setMessage(`${data.message}. Threats detected: ${data.threatsDetected}.`);
      setFile(null);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(getApiError(error, "The upload failed. Check the file and try again."));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="content-container">
          <header className="page-header">
            <div>
              <p className="eyebrow">Data ingestion</p>
              <h1 className="page-title">Upload security logs</h1>
              <p className="page-description">Securely analyze network events with the trained anomaly-detection model.</p>
            </div>
          </header>

          <div className="upload-layout">
            <section className="panel upload-panel">
              <div className="drop-zone">
                <div>
                  <div className="drop-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 15v4h14v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3>Select a network log file</h3>
                  <p>Choose a properly formatted CSV file up to 5 MB.</p>
                  <label className="primary-button" htmlFor="log-file">Browse files</label>
                  <input className="file-input" id="log-file" type="file" accept=".csv,text/csv" onChange={handleFileChange} />
                  {file && <div className="file-name">Selected: {file.name}</div>}
                </div>
              </div>
              {uploading && <div className="upload-progress"><span style={{ width: `${progress}%` }} /></div>}
              <button className="primary-button upload-button" onClick={handleUpload} disabled={uploading || !file}>
                {uploading ? `Analyzing ${progress}%` : "Upload and analyze"}
              </button>
              {message && <div className={`upload-message ${status}`} role="status">{message}</div>}
            </section>

            <aside className="panel requirements-panel">
              <h3>Required CSV columns</h3>
              <div className="requirement"><span className="requirement-check">1</span><div><strong>Core network data</strong><p>timestamp, sourceIP, destinationIP, protocol</p></div></div>
              <div className="requirement"><span className="requirement-check">2</span><div><strong>Optional ML features</strong><p>duration, src_bytes, dst_bytes improve anomaly scoring.</p></div></div>
              <div className="requirement"><span className="requirement-check">3</span><div><strong>Accepted protocols</strong><p>TCP, UDP, and ICMP values are validated server-side.</p></div></div>
            </aside>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default UploadLogs;
