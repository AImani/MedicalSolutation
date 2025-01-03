import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ExceptionError, Result } from "../general/@types";
import { UserInfoDto } from "./@types";

const URLUser = 'Users';

//#region User Info
export const getUserInfo = async (userId: number) =>
    await axios.get<Result<UserInfoDto>>(`${URLUser}/${userId}`).then((res) => res.data.Data!);

export const useUserInfo = (userId: number) => useQuery<UserInfoDto, ExceptionError>(
    {
        queryKey: ['UserInfo', userId],
        queryFn: () => {
            return getUserInfo(userId)
        },
        staleTime: 60 * (60 * 1000)
    })
//#endregion