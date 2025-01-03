import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAdminSurvey} from './context';
import {Button, Modal} from 'react-bootstrap';
import {SurveyResultDto} from './@types';
import {Column} from 'react-table';
import { KTIcon} from '@/_metronic/helpers';
import { Table } from '@/_metronic/partials/controls';
import { useNavigate } from 'react-router-dom';
import moment from 'jalali-moment';
import { mutToggleActiveSurvey, mutdeleteSurvey } from './services';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const SurveyTable: React.FC<any> = () => {
  const {t} = useTranslation();
  const provider = useAdminSurvey();
  const [show, setShow] = useState(false);
  const [remove, setRemove] = useState(false);
  const [id, setId] = useState("");
  const [confirmationText, setConfirmationText] = useState('');
  const navigate = useNavigate();

  const {queryParams, selectItem, item, setItem} = useMemo(
    () => ({
      queryParams: provider?.queryParams,
      search: provider?.querySurvey,
      selectItem: provider?.selectItem,
      item: provider?.item,
      setItem:provider?.setItem,
    }),
    [provider]
  );
   const handleDelete =()=>setRemove(false);
    const handleClose = () => {setShow(false); };
    const {mutate, isSuccess,error} = mutToggleActiveSurvey();
    const {mutate:deleteSurvey, isSuccess:isDeleted,error:deleteError} = mutdeleteSurvey();
    const queryClient = useQueryClient();
    const handleDeleteSurvey=()=>{
      deleteSurvey(id)
    }
    const handleActive =()=>{
       mutate(id);
    }
    useEffect(() => {
      if (isSuccess) {
        setShow(false);
        toast.success(t('Messages.Success'));
        queryClient.invalidateQueries({ queryKey: ['getAllSurvey'] });
      }
    }, [isSuccess]);
    useEffect(() => {
      if (isDeleted) {
        setRemove(false);
        toast.success(t('Survey.SuccessfullyDeleted'));
        queryClient.invalidateQueries({ queryKey: ['getAllSurvey'] });
      }
    }, [isDeleted]);

    useEffect(() => {
      deleteError?.Errors && toast.error(deleteError?.Errors.join('\n'));
    }, [error]);
  //  const handleClose = () => !!selectItem && selectItem(undefined);
  // const onSubmit = () => {};
  // const methods = useFormContext();
  const columns: ReadonlyArray<Column<SurveyResultDto>> = [
    
    {
      Header: t('Survey.Title'),
      accessor: 'Title',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.Title}</span>,
    },
    {
      Header: t('Survey.UserFullName'),
      accessor: 'OperatorUserFullName',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.OperatorUserFullName}</span>,
    },
    {
      Header: t('Survey.SurveyTypeId'),
      accessor: 'SurveyType',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.SurveyType}</span>,
    },
    {
      Header: t('Survey.InsertDateTime'),
      accessor: 'ActivationDateTime',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{ moment
        .from(cell.row.values.ActivationDateTime.toString(), 'en')
        .format('jYYYY/jMM/jDD')}</span>,
      minWidth: 100,
    },
    {
      Header: t('Survey.ExpirationDateTime'),
      accessor: 'ExpirationDateTime',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{ moment
        .from(cell.row.values.ExpirationDateTime.toString(), 'en')
        .format('jYYYY/jMM/jDD')}</span>,
      minWidth: 100,
    },
    
    {
      Header: t('Survey.Description'),
      accessor: 'Description',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.Description}</span>,
    },
    {
      Header: t('Survey.IsActive'),
      accessor: 'IsActive',
      Cell: ({cell}: any) => (
        <span className='fs-6 fw-bold'>
          {cell.row.values.IsActive ? (
            <span className='badge rounded-pill bg-success'> فعال</span>
          ) : (
            <span className='badge rounded-pill bg-warning'>غیرفعال </span>
          )}
        </span>
      ),
      minWidth: 100,
    },
    {
      Header: t('Survey.IsResponseEditable'),
      accessor: 'IsResponseEditable',
      Cell: ({cell}: any) => (
        <span className='fs-6 fw-bold'>
          {cell.row.values.IsResponseEditable ? (
            <span className='badge rounded-pill bg-success'> دارد</span>
          ) : (
            <span className='badge rounded-pill bg-warning'>ندارد </span>
          )}
        </span>
      ),
      minWidth: 100,
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
            onClick={() => {navigate(`/survey/edit/${+cell.row.original.Id}`); }}
          >
            <KTIcon iconName='edit' className='fs-2' /> {t('Actions.Edit')}
          </button>
          <button
            className={`btn btn-sm m-1 ${cell.row.original.IsActive ? 'btn-danger': 'btn-success'} `}
            type='button'
            value={cell.accessor}
            onClick={() => {
              setId(cell.row.original.Id)
              setShow(true);
              
            setConfirmationText(
              cell.row.original.IsActive
                ? t('Actions.MakeDeactive')
                : t('Actions.MakeActive')
            );}
          }
          >
            <KTIcon iconName='edit' className='fs-2' /> {cell.row.original.IsActive ? t('Actions.MakeDeactive') :t('Actions.MakeActive')}
          </button>
          <button
            className='btn btn-sm btn-danger m-1'
            type='button'
            value={cell.accessor}
            onClick={() => {setId(cell.row.original.Id); setRemove(true)} }
          >
            <KTIcon iconName='delete' className='fs-2' /> {t('Actions.Remove')}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns}/>
      <Modal size='sm' show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <h4>{confirmationText} {t('Customer.Survey')}</h4>
         
        </Modal.Header>
        <Modal.Body>
        <h5 className=' p-3 '> {t('Survey.IsToggleActive.Text',{0:confirmationText})}</h5>
        
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
         {t('Actions.Cancel')}
         </Button>
         <Button variant={confirmationText === t('Actions.MakeDeactive')? 'danger': 'success'} onClick={handleActive}>
            {confirmationText}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size='sm' show={remove} onHide={handleDelete} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <h4>{t('Survey.Delete')}</h4>
         
        </Modal.Header>
        <Modal.Body>
        <h5 className=' p-2'>{t('Survey.Delete.Confirmation')} </h5>
        
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleDelete}>
         {t('Actions.Cancel')}
         </Button>
         <Button variant='danger' onClick={handleDeleteSurvey}>
            {t('Actions.Remove')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
