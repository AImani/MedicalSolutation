import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAdminQuestion} from './context';
import {Button, Modal} from 'react-bootstrap';
import {List} from '@/_metronic/partials/controls/Table/List';
// import {RatingWrapper} from '../general/components/CustomeRating';
import {Column} from 'react-table';
import { Table } from '@/_metronic/partials/controls';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'jalali-moment';

import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { mutToggleActiveQuestion, mutdeleteQuestion } from './service';
import { QuestionResultDto } from './@types';
import { useAdminSurvey } from '../context';

export const QuestionTable: React.FC<any> = () => {
  const {t} = useTranslation();
  // const provider = useAdminSurvey();
  const [show, setShow] = useState(false);
  const [remove, setRemove] = useState(false);
  const [QsId, setId] = useState("");
  const [confirmationText, setConfirmationText] = useState('');
  const navigate = useNavigate();
  const{id} = useParams();
  // const {item} = useMemo(
  //   () => ({
  //       item: provider?.item,
  //   }),
  //   [provider]
  // );

    const handleDelete =()=>setRemove(false);
    const handleClose = () => {setShow(false); };
    const {mutate, isSuccess,error} = mutToggleActiveQuestion();
    const {mutate:deleteQuestion, isSuccess:isDeleted,error:deleteError} = mutdeleteQuestion();
    const queryClient = useQueryClient();
    const handleDeleteSurvey=()=>{
        deleteQuestion(QsId)
    }
    const handleActive =()=>{
       mutate(QsId);
    }
    useEffect(() => {
      if (isSuccess) {
        setShow(false);
        toast.success(t('Messages.Success'));
        queryClient.invalidateQueries({ queryKey: ['GetAllQuestions'] });
      }
    }, [isSuccess]);
    useEffect(() => {
      if (isDeleted) {
        setRemove(false);
        toast.success(t('Survey.SuccessfullyDeleted'));
        queryClient.invalidateQueries({ queryKey: ['GetAllQuestions'] });
      }
    }, [isDeleted]);

    useEffect(() => {
      deleteError?.Errors && toast.error(deleteError?.Errors.join('\n'));
    }, [error]);
 
  const columns: ReadonlyArray<Column<QuestionResultDto>> = [
    
    {
      Header: t('Question.Text'),
      accessor: 'Text',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.Text}</span>,
    },
    
    {
      Header: t('Question.Order'),
      accessor: 'Order',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{cell.row.values.Order}</span>,
    },
    {
      Header: t('Survey.InsertDateTime'),
      accessor: 'InsertDateTime',
      Cell: ({cell}: any) => <span className='fs-6 fw-bold'>{ moment
        .from(cell.row.values.InsertDateTime.toString(), 'en')
        .format('jYYYY/jMM/jDD')}</span>,
      minWidth: 100,
    },
    {
        Header: t('Questions.SurveyQuestionResponseType'),
        accessor: 'SurveyQuestionResponseType',
        Cell: ({ cell }: any) => {
          const responseType = cell.value;
          switch (responseType) {
            case 1:
              return "تک جوابی";
            case 2:
              return "چند جوابی";
            case 3:
              return "تشریحی";
            default:
              return "نوع نامشخص";
          }
        },
        minWidth: 100,
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
            onClick={() => {navigate(`/survey/${id}/question-option-list/${+cell.row.original.Id}`); }}
          >
             {t('Actions.Show')}
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
            {cell.row.original.IsActive ? t('Actions.MakeDeactive') :t('Actions.MakeActive')}
          </button>
          {/* <button
            className='btn btn-sm btn-danger m-1'
            type='button'
            value={cell.accessor}
            onClick={() => {setId(cell.row.original.Id); setRemove(true)} }
          >
            <KTIcon iconName='delete' className='fs-2' /> {t('Actions.Remove')}
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns}/>
      <Modal size='sm' show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <h4>{confirmationText} {t('Question.Text')}</h4>
         
        </Modal.Header>
        <Modal.Body>
        <h5 className=' p-3 text-center'> {t('Questions.IsToggleActive.Text',{0:confirmationText})}</h5>
        
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
          <h4>{t('Questions.Delete')}</h4>
         
        </Modal.Header>
        <Modal.Body>
        <h5 className=' p-3 '>{t('Questions.Delete.Confirmation')} </h5>
        
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
