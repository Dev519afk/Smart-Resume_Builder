import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css'; 

const BACKEND_URL = "http://localhost:5000"; 

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
  });

  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAiSuggestions = async () => {
    if (
      !formData.summary.trim() &&
      !formData.education.trim() &&
      !formData.experience.trim() &&
      !formData.skills.trim()
    ) {
      setAiSuggestions('Please fill relevant fields to get AI suggestions.');
      return;
    }

    setLoadingSuggestions(true);
    setAiSuggestions('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai-suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: formData.summary,
          education: formData.education,
          experience: formData.experience,
          skills: formData.skills,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setAiSuggestions(data.suggestions || "No suggestions available.");
    } catch (error) {
      console.error("Fetch error:", error);
      setAiSuggestions("Error: Failed to get AI suggestions");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const exportPDF = () => {
    const input = document.getElementById('resume-preview');
    if (!input) return;

    html2canvas(input, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 40;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      if (imgHeight < pdfHeight) {
        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let y = 20;
        while (heightLeft > 0) {
          pdf.addImage(imgData, 'PNG', 20, y, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            y = 20;
          }
        }
      }
      pdf.save('Smart-Resume.pdf');
    }).catch(err => {
      alert('Failed to generate PDF: ' + err.message);
    });
  };

  return (
    <>
      <h1>Smart Resume Builder</h1>
      <main>
        <form onSubmit={e => e.preventDefault()} aria-label="Resume input form">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            autoComplete="name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="xyz@example.com"
            required
            autoComplete="email"
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            required
            autoComplete="tel"
          />

          <label htmlFor="summary">Professional Summary</label>
          <textarea
            id="summary"
            name="summary"
            rows={4}
            value={formData.summary}
            onChange={handleChange}
            placeholder="Your career highlights..."
          />

          <label htmlFor="education">Education</label>
          <textarea
            id="education"
            name="education"
            rows={4}
            value={formData.education}
            onChange={handleChange}
            placeholder="Your education details..."
          />

          <label htmlFor="experience">Experience</label>
          <textarea
            id="experience"
            name="experience"
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            placeholder="Your work experience..."
          />

          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            name="skills"
            rows={3}
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js"
          />

          <button type="button" onClick={getAiSuggestions} disabled={loadingSuggestions}>
            {loadingSuggestions ? 'Analyzing...' : 'Get AI Suggestions'}
          </button>

          <button type="button" onClick={() => setPreviewMode(p => !p)}>
            {previewMode ? 'Edit Resume' : 'Preview Resume'}
          </button>

          {previewMode && (
            <button
              type="button"
              onClick={exportPDF}
              disabled={!(formData.fullName && formData.email)}
            >
              Export as PDF
            </button>
          )}
        </form>

        <section className="preview" id="resume-preview" aria-label="Resume preview">
          <h2>{formData.fullName || 'Your Name'}</h2>
          <p>
            {formData.email || 'your.email@example.com'}<br />
            {formData.phone || '+91 XXXXXXXXXX'}
          </p>

          {formData.summary && (
            <div>
              <h3 className="section-title">Professional Summary</h3>
              <p>{formData.summary}</p>
            </div>
          )}

          {formData.education && (
            <div>
              <h3 className="section-title">Education</h3>
              <p>{formData.education}</p>
            </div>
          )}

          {formData.experience && (
            <div>
              <h3 className="section-title">Work Experience</h3>
              <p>{formData.experience}</p>
            </div>
          )}

          {formData.skills && (
            <div>
              <h3 className="section-title">Skills</h3>
              <p>{formData.skills}</p>
            </div>
          )}

          {aiSuggestions && (
            <div className="suggestions">
              <strong>AI Suggestions:</strong>
              <pre>{aiSuggestions}</pre>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default ResumeBuilder;