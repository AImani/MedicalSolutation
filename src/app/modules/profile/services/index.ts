import axios from "axios";
import { GetDisabledSmsRequestDto, GetDisabledSmsResponseDto } from "../@types";

export const getAllDisabledSms = async (request: GetDisabledSmsRequestDto) => {
    const { data } = await axios.get<GetDisabledSmsResponseDto>(`CustomerReports/GetAllDisabledSms`);
    return data;
};

export const exportAllDisabledSms = (request: GetDisabledSmsRequestDto) =>
    axios.get(
        'CustomerReports/ExportAllDisabledSms',
        {
            responseType: 'blob',
        });

export const exportAllProfile = () =>
    axios.get(
        'CustomerReports/ExportAllCustomersReport',
        {
            responseType: 'blob',
        });

export const exportAllFilledProfile = () =>
    axios.get(
        'CustomerReports/ExportAllCustomersFilledReport',
        {
            responseType: 'blob',
        });

export const exportAllFilledProfileInRange = (fromDate: string, toDate: string) =>
    axios.get(
        `CustomerReports/ExportAllCustomersFilledReportInRange/${fromDate}/${toDate}`,
        {
            responseType: 'blob',
        });