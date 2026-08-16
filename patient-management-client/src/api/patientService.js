import axiosInstance from "./axiosInstance";

// Each function here maps directly to one endpoint on PatientsController.cs

export async function getAllPatients() {
  const response = await axiosInstance.get("/patients");
  return response.data;
}

export async function getPatientById(id) {
  const response = await axiosInstance.get(`/patients/${id}`);
  return response.data;
}

export async function createPatient(patient) {
  const response = await axiosInstance.post("/patients", patient);
  return response.data;
}

export async function updatePatient(id, patient) {
  // The backend checks that the id in the URL matches patient.id in the body,
  // so we make sure it's included here.
  const response = await axiosInstance.put(`/patients/${id}`, {
    ...patient,
    id,
  });
  return response.data;
}

export async function deletePatient(id) {
  await axiosInstance.delete(`/patients/${id}`);
}
