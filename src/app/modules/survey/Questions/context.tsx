import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {AdminSurveyQuestionContext, GetQuestionRequestDto} from './@types';
import {isEqual, isFunction} from 'lodash';
import { getAllQuestions } from './service';

const adminQuestionContext = createContext<AdminSurveyQuestionContext | null>(null);
export const useAdminQuestion = () => useContext(adminQuestionContext);
export const AdminQuestionConsumer = adminQuestionContext.Consumer;

export function AdminQuestionProvider({children}: any) {
const [Question, setQuestionItem] = useState<GetQuestionRequestDto>();
const [queryParams, setBaseQueryParams] = useState<GetQuestionRequestDto>({} as any);

  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const selectQs = ({id, qsid}:{id: string, qsid: string}) => {
      getAllQuestions(
        {
        id:id, 
        PageIndex: 0,
        PageSize: 0} as any)
        .then((res) => {
          const Question = res.Data.Result.find((qs:any) => qs.Id == qsid);
          setQuestionItem(Question );})
        .catch();
  };

  const context: AdminSurveyQuestionContext = {
    querySurvey: setQueryParams,
    queryParams,
    selectQs,
    Question,
  };

  return <adminQuestionContext.Provider value={context}>{children}</adminQuestionContext.Provider>;
}
