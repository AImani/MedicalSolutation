import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AdminCashbackClaimContext,
  BranchListDto,
  CashbackActionCommand,
  CashbackClaimDto,
  GetAllCashbackClaimDto,
} from './@types';
import {
  downloadExcel,
  mutSetAccepted,
  mutSetChecking,
  mutSetRejected,
  useCashbackClaimStatuses,
  useGetAllBranches,
  useGetAllCashbackClaimCheckingResults,
  useGetAllCashbackClaims,
  useGetAllSystemUsers,
  useGetStatistics,
} from './service';
import {isEqual, isFunction} from 'lodash';
import toast from 'react-hot-toast';
import { useAuth } from '../auth';
import { useQueryClient } from '@tanstack/react-query';

const adminCashbackClaimContext = createContext<AdminCashbackClaimContext | null>(null);
export const useAdminCashbackClaim = () => useContext(adminCashbackClaimContext);
export const AdminCashbackClaimContextConsumer = adminCashbackClaimContext.Consumer;

export function AdminCashbackClaimProvider({children}: any) {
  //#region init
  const queryClient = useQueryClient()
  const {t} = useTranslation();
  const authContext = useAuth();
  const userInfo = useMemo(() => authContext.currentUser, [authContext]);

  const [queryParams, setBaseQueryParams] = useState<GetAllCashbackClaimDto>({
    PageIndex: 0,
    PageSize: 10,
    GiftProviderId: null,
    NationalCode: null,
  } as any);

  const [showActionModal, setshowActionModal] = useState<boolean>(false);
  const [detailedCashbackClaim, setDetailedCashbackClaim] = useState<CashbackClaimDto | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const {
    data: cashbackClaims,
    refetch: loadCashbackClaims,
    isFetching,
  } = useGetAllCashbackClaims(queryParams);

  const toggleActionModal = (value: boolean) => setshowActionModal(value);
  const {data: statuses} = useCashbackClaimStatuses();
  const {data: systemUsers} = useGetAllSystemUsers();
  const {data: cashbackClaimCheckingResults} = useGetAllCashbackClaimCheckingResults();
  const branchList: BranchListDto[] = [];//useGetAllBranches();
  const {data: statistics, refetch: refetchStatistics} = useGetStatistics(
    detailedCashbackClaim?.CustomerNationalCode!,
    detailedCashbackClaim?.TerminalNo!,
    detailedCashbackClaim?.BranchId!
  );

  const {
    mutate: mutateSetChecking,
    isPending: setCheckingLoading,
    isSuccess: setCheckingIsSuccess,
    error: setCheckingErrors,
  } = mutSetChecking();
  const setChecking = async (dto: CashbackClaimDto) => {
    setDetailedCashbackClaim(dto);
    mutateSetChecking(dto.Id);
  };

  const showActionModalWithoutSetChecking = (dto: CashbackClaimDto) => {
    setDetailedCashbackClaim(dto);
    toggleActionModal(true);
  };

  useEffect(() => {
    detailedCashbackClaim && refetchStatistics();
  }, [detailedCashbackClaim?.BranchId]);

  const getExcel = async (request: GetAllCashbackClaimDto) => {
    setIsDownloading(true);
    try {
      await downloadExcel(request);
    } catch {
      setIsDownloading(false);
    }
    setIsDownloading(false);
  };

  const {
    mutate: mutateSetAccepted,
    isPending: setAcceptedLoading,
    isSuccess: setAcceptedIsSuccess,
    error: setAcceptedErrors,
  } = mutSetAccepted();
  const setAccepted = async (command: CashbackActionCommand) => {
    mutateSetAccepted(command);
  };

  const {
    mutate: mutateSetRejected,
    isPending: setRejectedLoading,
    isSuccess: setRejectedIsSuccess,
    error: setRejectedErrors,
  } = mutSetRejected();
  const setRejected = async (command: CashbackActionCommand) => {
    mutateSetRejected(command);
  };

  useEffect(() => {
    if (setCheckingIsSuccess) {
      setDetailedCashbackClaim({
        ...detailedCashbackClaim!,
        StatusId: 2,
        Status: t('CashbackClaim.Checking'),
      });

      toggleActionModal(true);
      loadCashbackClaims();
    } else {
      toggleActionModal(false);
    }
  }, [setCheckingIsSuccess]);

  useEffect(() => {
    if (setAcceptedIsSuccess) {
      toast.success(t('Messages.Success'));
      loadCashbackClaims();
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'AdminGetAllCashbackClaims' });
      toggleActionModal(false);
      setDetailedCashbackClaim(null);
    } else {
      toggleActionModal(false);
      setDetailedCashbackClaim(null);
    }
  }, [setAcceptedIsSuccess]);

  useEffect(() => {
    setAcceptedErrors?.Errors.map((error) => toast.error(error));
  }, [setAcceptedErrors]);

  useEffect(() => {
    setRejectedErrors?.Errors.map((error) => toast.error(error));
  }, [setRejectedErrors]);

  useEffect(() => {
    setCheckingErrors?.Errors.map((error) => toast.error(error));
  }, [setCheckingErrors]);

  useEffect(() => {
    if (setRejectedIsSuccess) {
      toast.success(t('Messages.Success'));
      loadCashbackClaims();
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'AdminGetAllCashbackClaims' });
      setDetailedCashbackClaim(null);
      toggleActionModal(false);
    } else {
      setDetailedCashbackClaim(null);
      toggleActionModal(false);
    }
  }, [setRejectedIsSuccess]);

  useEffect(() => {
    loadCashbackClaims();
  }, [queryParams]);

  const context: AdminCashbackClaimContext = {
    queryCashbackClaims: setQueryParams,
    getExcel,
    queryParams: queryParams,
    items: cashbackClaims,
    isLoading: isFetching,
    statuses,
    systemUsers,
    cashbackClaimCheckingResults,
    branchList,
    showActionModal,
    toggleActionModal,
    detailedCashbackClaim,
    setCheckingLoading,
    setAcceptedLoading,
    setRejectedLoading,
    isDownloading,
    showActionModalWithoutSetChecking,
    setChecking,
    setAccepted,
    setRejected,
    statistics,
  };

  return (
    <adminCashbackClaimContext.Provider value={context}>
      {children}
    </adminCashbackClaimContext.Provider>
  );
}

export const getStatusColor = (statusId: number) => {
  if (statusId === 1) return 'bg-secondary text-dark';
  else if (statusId === 2) return 'bg-warning';
  else if (statusId === 3) return 'bg-success';
  else return 'bg-danger';
};
