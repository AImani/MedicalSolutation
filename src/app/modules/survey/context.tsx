import {createContext, useContext, useState, useCallback, useEffect, useMemo} from 'react';
import {isEqual, isFunction} from 'lodash';
import * as surveyApi from './services';
import { AdminSurveyContext, GetSurveyRequestDto, SetApprovalRequestDto, SetCommentRequestDto, SurveyResultDto } from './@types';
import {  usegetAllSurvay } from './services';

const adminsurveyContext = createContext<AdminSurveyContext | null>(null);
export const useAdminSurvey = () => useContext(adminsurveyContext);
export const AdminSurveyConsumer = adminsurveyContext.Consumer;

export function AdminSurveyProvider({children}: any) {
  const [item, setItem] = useState<SurveyResultDto>();
  const [queryParams, setBaseQueryParams] = useState<GetSurveyRequestDto>({} as any);

  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const selectItem = (id: number ) => {
    if (id === undefined) setItem(undefined);
    else{
      surveyApi.getAllSurveys({PageIndex: 0,
      PageSize: 0,})
        .then((res) => {
          const survey = res.Data.Result.find((survey:any) => survey.Id === id);
          setItem(survey);})
        .catch();

    }
  };

  const context: AdminSurveyContext = {
    querySurvey: setQueryParams,
    selectItem,
    item,
    setItem,
    queryParams,
  };

  return <adminsurveyContext.Provider value={context}>{children}</adminsurveyContext.Provider>;
}
