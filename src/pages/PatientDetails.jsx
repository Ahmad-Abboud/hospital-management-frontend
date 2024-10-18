import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Patient Details for ID: {id}</h1>
      {/* Fetch and display patient details based on ID */}
    </div>
  );
};

export default PatientDetails;
