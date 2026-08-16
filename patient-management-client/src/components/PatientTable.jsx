export default function PatientTable({ patients, onEdit, onDelete }) {
  if (patients.length === 0) {
    return <p className="empty-state">No patients yet. Add the first one above.</p>;
  }

  return (
    <table className="patient-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Disease</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.disease}</td>
            <td>{patient.phone}</td>
            <td className="patient-table-actions">
              <button className="btn btn-ghost" onClick={() => onEdit(patient)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(patient.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
