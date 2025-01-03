import { Result } from "@/app/modules/general/@types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GetCashbackClaimKpiDto {
    Details: [
        {
          OperatorId: number,
          FullName:string,
          StatusId: number,
          StatusName: null | string,
          Count: number
        }
      ],
      TotalCount: number
}
export const CashbackClaimKpi = async (justToday:boolean) => {
    const { data } = await axios.get(`Dashboard/CashbackClaimKpi/${justToday}`);
    return data;
};

export const useCashbackClaimKpi = (justToday:boolean) => {
    return useQuery<Result<GetCashbackClaimKpiDto>, Error>({ queryKey: ['getAllSurvey', justToday], 
    queryFn: () => CashbackClaimKpi(justToday), 
    staleTime: 60 * (60 * 1000)});
}