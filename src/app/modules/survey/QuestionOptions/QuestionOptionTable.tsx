import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Modal} from 'react-bootstrap';
import {List} from '@/_metronic/partials/controls/Table/List';
import {Column} from 'react-table';
import { Table } from '@/_metronic/partials/controls';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'jalali-moment';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { mutToggleActiveOption } from './service';
import { QuestionOptionResultDto } from './@types';

export const QuestionOptionTable: React.FC<any> = () => {
  const {t} = useTranslation();
  const [show, setShow] = useState(false);
  const [QsId, setId] = useState("");
  const [confirmationText, setConfirmationText] = useState('');
  const handleClose = () => {setShow(false); };
  const {mutate, isSuccess,error} = mutToggleActiveOption();
  const queryClient = useQueryClient();
   
    const handleActive =()=>{
       mutate(QsId);
    }
    useEffect(() => {
      if (isSuccess) {
        setShow(false);
        toast.success(t('Messages.Success'));
        queryClient.invalidateQueries({ queryKey: ['GetAllQuestionOptions'] });
      }
    }, [isSuccess]);
    
 
  const columns: ReadonlyArray<Column<QuestionOptionResultDto>> = [
    
    {
      Header: t('Question.TextOption'),
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
        Header: t('Survey.SatisfactionRateNumber'),
        accessor: 'SatisfactionRate',
        Cell: ({ cell }: any) => <span className='fs-6 fw-bold'>{cell.row.values.SatisfactionRate}</span>,
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
         <h5 className=' p-3 text-center'> {t('Questions.IsToggleActive.OptionText',{0:confirmationText})}</h5>
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
      {/* <Modal size='sm' show={remove} onHide={handleDelete} backdrop='static' keyboard={false}>
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
      </Modal> */}
    </>
  );
};
