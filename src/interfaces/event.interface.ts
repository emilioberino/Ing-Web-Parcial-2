export interface IEventoData {
    anfitrion: string;
    descripcion: string;
    inicio: Date;
    duracion: number;
}

export interface ReScheduleParams {
    days?: number;
    weeks?: number;
    months?: number;
    years?: number;
}