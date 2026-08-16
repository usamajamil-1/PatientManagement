import { useEffect, useState } from "react";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../api/patientService";
import PatientForm from "../components/PatientForm";
import PatientTable from "../components/PatientTable";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      setError("Could not load patients. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddOrUpdate(formData) {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, formData);
      } else {
        await createPatient(formData);
      }
      setEditingPatient(null);
      await loadPatients();
    } catch (err) {
      setError("Could not save patient.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this patient?")) return;
    try {
      await deletePatient(id);
      await loadPatients();
    } catch (err) {
      setError("Could not delete patient.");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Patients</h1>
        <p>{patients.length} on record</p>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <PatientForm
        editingPatient={editingPatient}
        onSubmit={handleAddOrUpdate}
        onCancel={() => setEditingPatient(null)}
      />

      {loading ? (
        <p className="empty-state">Loading patients...</p>
      ) : (
        <PatientTable
          patients={patients}
          onEdit={setEditingPatient}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
