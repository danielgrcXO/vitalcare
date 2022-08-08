export interface patientInformation{
    id: number;
    name: string;
    bloodType: string;
    roomNumber: number;
    bedNumber: number;
}

export interface patientStatus{
    Fecha: string;
    Hora: string;
    patientStatus: string;
}

export interface patientStatusSimulated{
    Fecha: string;
    Hora: string;
    patientStatus: string;
}

export interface newPatient{
    id: number;
    name: string;
    age: number;
    bloodType: string;
    weight: number;
    idMeds: number;
    idRoom: number;
}