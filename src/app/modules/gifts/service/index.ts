import axios, { AxiosResponse } from "axios";
import { GetAllGiftRequestDto, GetGiftExcelResponseDto, GiftDto, GiftExcelRequestCommand, GiftProviderDto, GiftRequestCommand } from "../@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ExceptionError, PaginateResult, Result } from "@/app/modules/general/@types";
import { blobToExcelDownload } from "@/app/modules/general/helpers";

//#region api
const importGiftExcel = async (request: GiftExcelRequestCommand) => {
    const formData = new FormData();
    formData.append('File', request.File);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    };

    const { data } = await axios.post<GetGiftExcelResponseDto>(`Gifts/Import`, formData, config);
    return data;
};

const getAllGifts = async (request: GetAllGiftRequestDto) => {
    return await axios.post('Gifts/GetAll', request)
        .then((response: AxiosResponse<PaginateResult<GiftDto>>) => response.data)
}

export const downloadReportExcelFile = async () => {
    const { data } = await axios.get('Gifts/ExportExcel', {
        responseType: 'blob',
    });
    blobToExcelDownload(data, "ExportedGifts");
};

export const downloadSampleExcelFile = async () => {
    const { data } = await axios.get('Gifts/SampleExcel', {
        responseType: 'blob',
    });
    blobToExcelDownload(data, "ImportGiftSample");
};

const giftRequest = async (params: GiftRequestCommand) => {
    const objectToSend = {
        GiftProviderId: Number(params.GiftProviderId),
        Amount: convertToNumber(params.Amount),
        VoucherCode: params.VoucherCode,
        NationalCode: params.NationalCode,
        ActivateDate: new Date(params.ActivateDate).toISOString(),
        ExpireDate: new Date(params.ExpireDate).toISOString(),
        IsApi: params.IsApi
    }
    const { data } = await axios.post('Gifts', objectToSend);
    return data;
}

const convertToNumber = (str: string | undefined) => {
    if (str === undefined || str === '')
        return null

    return Number(str.replaceAll(',', ''))
}

const getAllGiftProviders = async () => {
    return await axios.get('Gifts/GiftProviders')
        .then((response: AxiosResponse<Result<GiftProviderDto[]>>) => {
            return response.data.Data ?? []
        });
}
//#endregion

//#region query, mutation
export const useGiftProviders = () => useQuery<GiftProviderDto[], ExceptionError>({
    queryKey: ['GiftProviders'], queryFn: () =>
        getAllGiftProviders(), staleTime: 60 * (60 * 1000)
})

export const useGetAllGifts = (request: GetAllGiftRequestDto) => {
    return useQuery<PaginateResult<GiftDto> | null, ExceptionError>({
        queryKey: ['GetAllGifts'], queryFn: () =>
            getAllGifts(request), staleTime: 60 * (60 * 1000)
    })
}

export const mutAddGift = () =>
    useMutation<void, ExceptionError, GiftRequestCommand>({ mutationKey: ["giftFromApiRequest"], mutationFn: giftRequest })

export const mutImportExcelGift = () =>
    useMutation<GetGiftExcelResponseDto, ExceptionError, GiftExcelRequestCommand>({ mutationKey: ["giftFromApiRequest"], mutationFn: importGiftExcel })
//#endregion