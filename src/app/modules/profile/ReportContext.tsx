import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { isEqual, isFunction } from 'lodash';
import { GetDisabledSmsRequestDto, GetDisabledSmsResponseDto, ReportContext } from './@types';
import { Exception } from '../general/@types';
import { useAuth } from '../auth';
import { exportAllDisabledSms, exportAllFilledProfile, exportAllFilledProfileInRange, exportAllProfile, getAllDisabledSms } from './services';

const reportContext = createContext<ReportContext | null>(null);
export const useReport = () => useContext(reportContext);

export function ReportProvider({ children }: any) {

    const authContext = useAuth();
    const { userInfo } = useMemo(() => {
        return {
            userInfo: authContext.currentUser
        };
    }, [authContext]);

    //#region init
    const [disabledSms, setDisbledSmsData] = useState<GetDisabledSmsResponseDto>({
        Data: {
            PageIndex: 0,
            PageSize: 10,
            TotalCount: 0,
            Result: [],
        },
    } as any);

    const [error, setError] = useState<Exception | null>(null);
    const [queryParams, setBaseQueryParams] = useState<GetDisabledSmsRequestDto>({} as any);

    const setQueryParams = useCallback((nextQueryParams:any) => {
        setBaseQueryParams((prevQueryParams: any) => {
            if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);

            if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

            return nextQueryParams;
        });
    }, []);

    const exportExcel = useCallback(() => {
        setError(null);
        exportAllDisabledSms(queryParams).then(
            ({ data }) => {
                const url = window.URL.createObjectURL(data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',

                    `مشتریان با پیامک روزانه غیرفعال.xlsx`
                );

                document.body.appendChild(link);
                link.click();
            },
            (reject: Exception) => setError(reject)
        );
    }, []);

    const exportExcelProfile = useCallback(() => {
        setError(null);
        exportAllProfile().then(
            ({ data }) => {
                const url = window.URL.createObjectURL(data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    'پروفایل مشتریان.xlsx'
                );

                document.body.appendChild(link);
                link.click();
            },
            (reject: Exception) => setError(reject)
        );
    }, []);

    const exportExcelFilledProfile = useCallback(() => {
        setError(null);
        exportAllFilledProfile().then(
            ({ data }) => {
                const url = window.URL.createObjectURL(data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    'پروفایل مشاریان تکمیل شده.xlsx'
                );

                document.body.appendChild(link);
                link.click();
            },
            (reject: Exception) => setError(reject)
        );
    }, []);

    const exportProfileFilledReportInRange = useCallback((fromDate: string, toDate: string) => {
        setError(null);
        exportAllFilledProfileInRange(fromDate, toDate).then(
            ({ data }) => {
                const url = window.URL.createObjectURL(data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    'پروفایل مشاریان تکمیل شده در بازه تاریخی.xlsx'
                );

                document.body.appendChild(link);
                link.click();
            },
            (reject: Exception) => setError(reject)
        );
    }, []);
    //#endregion

    //#region actions
    useEffect(() => {
        const search = () => {
            setError(null);
            return getAllDisabledSms(queryParams).then(
                (data) => {
                    setDisbledSmsData(data);
                },
                (reject: Exception) => setError(reject)
            );
        };

        if (!!queryParams) search();
    }, [queryParams]);
    //#endregion

    const context: ReportContext = {
        queryReport: setQueryParams,
        exportReport: exportExcel,
        exportProfileReport: exportExcelProfile,
        exportProfileFilledReport: exportExcelFilledProfile,
        exportProfileFilledReportInRange: exportProfileFilledReportInRange,
        items: disabledSms,
        queryParams,
        error
    };

    return <reportContext.Provider value={context}>{children}</reportContext.Provider>;
}
