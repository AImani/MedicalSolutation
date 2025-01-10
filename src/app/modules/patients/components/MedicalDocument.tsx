import React, { useState } from 'react';

const MedicalDocument: React.FC = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        documentType: '',
        issueDate: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="patientName">Patient Name:</label>
                <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="documentType">Document Type:</label>
                <select
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Document Type</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="Imaging">Imaging</option>
                </select>
            </div>
            <div>
                <label htmlFor="issueDate">Issue Date:</label>
                <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MedicalDocument;