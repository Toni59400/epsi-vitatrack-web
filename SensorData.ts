// SensorData.ts
export interface SensorData {
    id: number; // Si vous le recevez aussi depuis le serveur
    temperature: number;
    humidity: number;
    timestamp: string; // En ISO 8601 format, si c'est ce que vous envoyez
}
