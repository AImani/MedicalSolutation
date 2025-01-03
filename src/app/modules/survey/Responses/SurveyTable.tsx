import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAdminSurvey} from './context';
import {Modal} from 'react-bootstrap';
import {SurveyResultDto} from './@types';
import {List} from '@/_metronic/partials/controls/Table/List';
import {Column} from 'react-table';
import {useFormContext} from 'react-hook-form';
import {KTIcon} from '@/_metronic/helpers';
import { Table } from '@/_metronic/partials/controls';
import moment from 'jalali-moment';
import { Show } from './Show';

export const SurveyResponseTable: React.FC<any> = () => {
  const {t} = useTranslation();
  const provider = useAdminSurvey();
  const [show, setShow] = useState(false);
  const[mode, setmode]= useState<{IsApproved:boolean,response:string,Id:number}>()

  const {queryParams, selectItem, item, selectResponse, response} = useMemo(
    () => ({
      queryParams: provider?.queryParams,
       response: provider?.response,
       search: provider?.querySurvey,
       selectResponse: provider?.selectResponse,
       selectItem: provider?.selectItem,
       item: provider?.item,
    }),
    [provider]
  );
  useEffect(() => {
    if(item){
      setShow(true)
    }
  }, [item])
  
  const handleClose = () => setShow(false);
  const onSubmit = () => {};
  const methods = useFormContext();
  const columns: ReadonlyArray<Column<SurveyResultDto>> = [
    {
      Header: t('Survey.UserFullName'),
      accessor: 'UserFullName',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.UserFullName}</span>,
    },
    {
      Header: t('Survey.SurveyTypeId'),
      accessor: 'SurveyType',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.SurveyType}</span>,
    },
    {
      Header: t('Survey.InsertDateTime'),
      accessor: 'InsertDateTime',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{ moment
        .from(cell.row.values.InsertDateTime.toString(), 'en')
        .format('jYYYY/jMM/jDD')}{}</span>,
      minWidth: 100,
    },
    
    {
      Header: t('Survey.MerchantName'),
      accessor: 'RefName',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.RefName}</span>,
    },
    {
      Header: t('Survey.IsApproved'),
      accessor: 'IsApproved',
      Cell: ({cell}: any) => (
        <span className='fs-6 fw-bold'>
          {cell.row.values.IsApproved ? (
            <span className='badge rounded-pill bg-success'>تایید شده</span>
          ) : (
            <span className='badge rounded-pill bg-warning'>تایید نشده</span>
          )}
        </span>
      ),
      minWidth: 100,
    },
    {
      Header: t('Survey.OperatorResponse'),
      accessor: 'OperatorResponse',
      minWidth: 150,
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.OperatorResponse}</span>,
    },
    {
      Header: t('Actions.Operation'),
      minWidth: 90,
      accessor: 'Id',
      id: 'actions',
      Cell: (cell: any) => (
        <div>

          <button
            className='btn btn-sm btn-success m-1'
            type='button'
            value={cell.accessor}
            onClick={() => {!!selectResponse && selectResponse(cell.row.original.Id);!!selectItem && selectItem(cell.row.original.SurveyId), setmode({IsApproved:cell.row.values.IsApproved, response:cell.row.values.OperatorResponse, Id:cell.row.original.Id}) } }
          >
            <KTIcon iconName='double-check' className='fs-2' /> {t('Actions.Check')}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns}/>
      <Modal size='xl' show={!!item} onHide={()=> selectItem && selectItem(undefined)} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
         {response &&<h4>{response?.Title}</h4>}
          
        </Modal.Header>
        <Modal.Body>
          <Show mode={mode}/>
        </Modal.Body>
      </Modal>
    </>
  );
};
