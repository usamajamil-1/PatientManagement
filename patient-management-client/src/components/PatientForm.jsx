import { useEffect, useState } from "react";

const emptyForm = { name: "", age: "", disease: "", phone: "" };


export default function PatientForm({ editingPatient, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingPatient) {
      setForm({
        name: editingPatient.name,
        age: editingPatient.age,
        disease: editingPatient.disease,
        phone: editingPatient.phone,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingPatient]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      age: Number(form.age),
    });
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h3>{editingPatient ? "Edit patient" : "Add patient"}</h3>

      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Age
        <input
          name="age"
          type="number"
          min="0"
          value={form.age}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Disease
        <input
          name="disease"
          value={form.disease}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingPatient ? "Save changes" : "Add patient"}
        </button>
        {editingPatient && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
