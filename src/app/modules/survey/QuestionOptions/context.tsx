import {createContext, useCallback, useContext, useState} from 'react';
import {AdminQuestionOptionContext, GetQuestionOptionRequestDto} from './@types';
import {isEqual, isFunction} from 'lodash';
import { getAllQuestions } from '../Questions/service';
import { GetQuestionRequestDto } from '../Questions/@types';

const adminQuestionOptionContext = createContext<AdminQuestionOptionContext | null>(null);
export const useAdminQuestionOption = () => useContext(adminQuestionOptionContext);
export const AdminQuestionConsumer = adminQuestionOptionContext.Consumer;

export function AdminQuestioOptionProvider({children}: any) {
  const [queryParams, setBaseQueryParams] = useState<GetQuestionOptionRequestDto>({} as any);

  const setQueryParams = useCallback((nextQueryParams: any) => {
    setBaseQueryParams((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) nextQueryParams = nextQueryParams(prevQueryParams);
      if (isEqual(prevQueryParams, nextQueryParams)) return prevQueryParams;

      return nextQueryParams;
    });
  }, []);

  const [item, setItem] = useState<GetQuestionRequestDto>();
  const selectItem = ({id, qsid}:{id: string, qsid: string}) => {
    getAllQuestions(
      {
      id:id, 
      PageIndex: 0,
      PageSize: 0} as any)
      .then((res) => {
        const Question = res.Data.Result.find((qs:any) => qs.Id == qsid);
        setItem(Question );})
      .catch();
  };
  const context: AdminQuestionOptionContext = {
    querySurvey: setQueryParams,
    queryParams,
    selectItem,
    item,
  };

  return (
    <adminQuestionOptionContext.Provider value={context}>
      {children}
    </adminQuestionOptionContext.Provider>
  );
}
