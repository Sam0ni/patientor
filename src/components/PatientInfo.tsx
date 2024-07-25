import { useEffect, useState } from "react";
import { Patient, PatientInfoProps } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const PatientInfo = (props: PatientInfoProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const pat = await patientService.getOne(id);
      setPatient(pat);
    };

    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  if (!patient) {
    return <h2>Invalid ID</h2>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>{patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <div>
        {patient.entries.map((e) => {
          return (
            <div>
              <p>
                {e.date} {e.description}
              </p>
              <ul>
                {e.diagnosisCodes &&
                  e.diagnosisCodes.map((d) => {
                    return (
                      <li>
                        {d} {props.diagnoses.find((o) => o.code === d)?.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientInfo;
