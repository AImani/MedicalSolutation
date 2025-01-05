import axios, {AxiosResponse} from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {ExceptionError, Result} from '@/app/modules/general/@types';
import {AccNumberResponse, RefundWithAccNumberCommand} from '../@types';

const getAcountNumber = async (AccNo: string) => {
  return await axios
    .get(`FinancialTransfers/InquiryAccountOwner?accountNo=${AccNo}`)
    .then((response: AxiosResponse<Result<AccNumberResponse>>) => {
      console.log(response);
      return response.data;
    });
};

const setRefundWithRefNumber = async (command: RefundWithAccNumberCommand) =>
  await axios
    .post<Result<string>>(`FinancialTransfers/WithAccountNo`, {...command})
    .then((res) => res.data);

export const mutRefundWithAccNumber = () =>
  useMutation<Result<string>, ExceptionError, RefundWithAccNumberCommand>({
    mutationKey: ['RefundWithAccNumberCommand'],
    mutationFn: setRefundWithRefNumber,
  });

export const GetAcountNumber = (AccNo: string) => {
  const Accnolength = AccNo?.toString().length > 11;
  return useQuery<Result<AccNumberResponse>, ExceptionError>({
    queryKey: ['GetAccountNumber', AccNo],
    queryFn: () => getAcountNumber(AccNo),

    enabled: Accnolength,
  });
};
