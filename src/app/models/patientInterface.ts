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
