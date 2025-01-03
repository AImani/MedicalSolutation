import {createContext, useContext, useState, useCallback, useEffect, useMemo} from 'react';
import {isEqual, isFunction} from 'lodash';
import {AdminSurveyContext, GetSurveyRequestDto, QuestionResult, SurveyResultDto} from './@types';
import {getAllSurveys} from '../services';
import {getAllQuestions} from '../Questions/service';
import {getSurveyResponse} from './services';
import { getAllQuestionOption } from '../QuestionOptions/service';

const adminsurveyContext = createContext<AdminSurveyContext | null>(null);
export const useAdminSurvey = () => useContext(adminsurveyContext);
export const AdminSurveyConsumer = adminsurveyContext.Consumer;

export function AdminSurveyProvider({children}: any) {
  const [item, setItem] = useState<QuestionResult[]>();
  const [response, setRespons] = useState(null);
  const [Qsoption, setQsoption] = useState();
 
  const [queryParams, setBaseQueryParams] = useState<GetSurveyRequestDto>({} as any);

  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const selectItem = (id: string | undefined) => {
    if (id === undefined) setItem(undefined);
    else {
      getAllQuestions({
        id: id,
        PageIndex: 0,
        PageSize: 0,
      } as any)
        .then((res) => {
          setItem(res.Data.Result);
        })
        .catch();
    }
  };

  const selectQsOption = (id: string) => {
      getAllQuestionOption({
        id: id,
        PageIndex: 0,
        PageSize: 0,
      } as any)
        .then((res) => {
          console.log(res)
          setQsoption(res.Data.Result);
        })
        .catch();
    
  };
  

  const selectResponse = (id: string) => {
    getSurveyResponse(id)
      .then((res) => {
        
        setRespons(res.Data);
      })
      .catch();
  };


  const context: AdminSurveyContext = {
    querySurvey: setQueryParams,
    selectItem,
    item,
    response,
    selectResponse,
    Qsoption,
    selectQsOption,
    queryParams,
    
  };

  return <adminsurveyContext.Provider value={context}>{children}</adminsurveyContext.Provider>;
}
