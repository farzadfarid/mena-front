import { ServiceAppointmentModel } from 'src/app/Core/Models/Specialists/ServiceAppointment.model';

export interface ExtendedServiceAppointmentModel extends ServiceAppointmentModel {
    parsedServiceName: string;
}