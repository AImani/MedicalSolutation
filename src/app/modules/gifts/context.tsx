import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AdminGiftContext,
  GetAllGiftRequestDto,
  GiftExcelRequestCommand,
  GiftRequestCommand,
} from './@types';
import {mutAddGift, mutImportExcelGift, useGetAllGifts, useGiftProviders} from './service';
import toast from 'react-hot-toast';
import {base64ToExcelDownload} from '@/app/modules/general/helpers';
import {isEqual, isFunction} from 'lodash';
import { useAuth } from '../auth';

const giftsReportContext = createContext<AdminGiftContext | null>(null);
export const useGiftsReport = () => useContext(giftsReportContext);
export const GiftsReportContextConsumer = giftsReportContext.Consumer;

const adminGiftContext = createContext<AdminGiftContext | null>(null);
export const useAdminGift = () => useContext(adminGiftContext);
export const AdminGiftConsumer = adminGiftContext.Consumer;

export function AdminGiftProvider({children}: any) {
  //#region init
  const {t} = useTranslation();
  const authContext = useAuth();
  const userInfo = useMemo(() => authContext.currentUser, [authContext]);

  const [queryParams, setBaseQueryParams] = useState<GetAllGiftRequestDto>({
    PageIndex: 0,
    PageSize: 10,
    GiftProviderId: null,
    NationalCode: null,
  } as any);
  const [showAddGiftModal, setShowAddGiftModal] = useState<boolean>(false);

  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const {data: gifts, refetch: loadGifts, isFetching} = useGetAllGifts(queryParams);
  const {data: giftProviders} = useGiftProviders();

  const toggleAddGiftModal = (value: boolean) => setShowAddGiftModal(value);

  const {
    mutate,
    isPending: importFromExcelLoading,
    isSuccess: importGiftFromExcelIsSuccess,
    data: importGiftFromExcelResponse,
    error: importGiftFromExcelErrors,
  } = mutImportExcelGift();
  const importGiftFromExcel = async (dto: GiftExcelRequestCommand) => {
    mutate(dto);
  };

  const {
    mutate: mutateAddGift,
    isPending: addGiftFromApiLoading,
    isSuccess: addGiftFromApiIsSuccess,
    error: addGiftFromApiErrors,
  } = mutAddGift();
  const sendGiftFromApi = async (dto: GiftRequestCommand) => {
    mutateAddGift(dto);
  };

  useEffect(() => {
    if (importGiftFromExcelIsSuccess) {
      if (importGiftFromExcelResponse.Data?.InvalidRowsCount! > 0) {
        base64ToExcelDownload(importGiftFromExcelResponse.Data?.ExportedExcelBytes, 'InvalidRows');
        toast.error(
          t('Gifts.InvalidRowRecordsAreAvailableInExcelFile', {
            0: importGiftFromExcelResponse.Data?.InvalidRowsCount,
          }),
          {
            duration: 8000,
          }
        );
      }
      if (importGiftFromExcelResponse.Data?.InsertedRowsCount! > 0) {
        toast.success(
          t('Messages.SuccessfullImport', {0: importGiftFromExcelResponse.Data?.InsertedRowsCount, 1: t('Gifts.Title')})
        );
        loadGifts();
      }
    }
  }, [importGiftFromExcelIsSuccess]);

  useEffect(() => {
    loadGifts();
  }, [queryParams]);

  useEffect(() => {
    if (addGiftFromApiIsSuccess) {
      toggleAddGiftModal(false);
      toast.success(t('Messages.Success'));
      loadGifts();
    }
  }, [addGiftFromApiIsSuccess]);

  const context: AdminGiftContext = {
    queryGifts: setQueryParams,
    queryParams: queryParams,
    items: gifts,
    isLoading: isFetching,
    giftProviders: giftProviders,
    showAddGiftModal,
    toggleAddGiftModal,
    importFromExcelLoading,
    importGiftFromExcel,
    importGiftFromExcelErrors: importGiftFromExcelErrors?.Errors,
    sendGiftFromApi,
    addGiftFromApiLoading,
    addGiftFromApiErrors: addGiftFromApiErrors?.Errors,
  };

  return <adminGiftContext.Provider value={context}>{children}</adminGiftContext.Provider>;
}
