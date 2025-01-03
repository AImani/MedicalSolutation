import {FC, useState, createContext, useContext} from 'react';
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  WithChildren,
} from '@helpers/index';

const QueryRequestContext = createContext<QueryRequestContextProps | null>(null);
const QueryRequestConsumer = QueryRequestContext.Consumer
const QueryRequestProvider: FC<
  WithChildren & {preState: QueryState} & {reCallState?: Function} & {queryKey: string; queryFn: Function}
> = ({children, preState, reCallState, queryKey, queryFn}) => {
  const [state, setState] = useState<QueryState>(preState || initialQueryRequest.state);

  const updateState = (updates: Partial<QueryState>) => 
    setState({...state, ...updates} as QueryState);

  return (
    <QueryRequestContext.Provider value={{state, reCallState, updateState, queryKey, queryFn}}>
      {children}
    </QueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(QueryRequestContext);
export {QueryRequestProvider, useQueryRequest, QueryRequestConsumer};
