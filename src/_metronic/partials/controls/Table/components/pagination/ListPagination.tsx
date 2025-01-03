import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from '../../core/QueryResponseProvider';
import {useQueryRequest} from '../../core/QueryRequestProvider';
import {useEffect, useMemo, useState} from 'react';

const ListPagination = () => {
  const pagination = useQueryResponsePagination();
  const isLoading = useQueryResponseLoading();
  const queryRequest = useQueryRequest();
  const updateState = useMemo(() => queryRequest?.updateState, [queryRequest]);
  const updatePage = (page: number | undefined | null) => {
    if (page == undefined || page == null  || isLoading || pagination.PageIndex === page) {
      return;
    }

    !!updateState && updateState({PageIndex: page, PageSize: pagination.PageSize || 10});
  };

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(
      Math.floor(pagination.TotalCount / pagination.PageSize || 0) +
        (pagination.TotalCount % pagination.PageSize > 0 ? 1 : 0)
    );
  }, [pagination]);
  const [canPreviousPage, setCanPreviousPage] = useState(pagination.PageIndex > 0);
  const [canNextPage, setCanNextPage] = useState(pagination.PageIndex + 1 < pageCount);

  useEffect(() => {
    setCanPreviousPage(pagination.PageIndex > 0);
    setCanNextPage(pagination.PageIndex + 1 < pageCount);
  }, [pagination]);

  function showPages(n: number) {
    var min = 1,
      max = pageCount;
    var before = Math.floor(n);
    // var after = +(n - before).toFixed(2) * 100;
    var result = [];
    for (var i = before - 2; i <= before + 2; i++) {
      if (i >= min && i <= max) {
        result.push(i);
      }
    }
    return result;
  }
  
  return (
    <div className='m-0 px-0 table-footer mt-2'>
      <div className='table-footer-nav'>
        <div className='btn-group btn-group-sm'>
          <button
            type='button'
            className='btn ps-4 pe-3 h-30px fs-5 lh-1 btn-outline-dark'
            onClick={() => updatePage(0)}
            disabled={!canPreviousPage}
          >
            <i className='fs-4 bi bi-chevron-double-right'></i>
          </button>
          <button
            type='button'
            className='btn ps-4 pe-3 h-30px fs-5 lh-1 btn-outline-dark'
            onClick={() => updatePage(pagination.PageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <i className='fs-4 bi bi-chevron-right'></i>
          </button>
          {showPages(pagination.PageIndex + 1).map((e, i) => (
            <button
              key={e - 1}
              type='button'
              className={`btn px-4 h-30px btn-outline-dark fs-5 lh-1 rounded ${
                e - 1 == pagination.PageIndex ? 'border border-dark' : 'text-black'
              }`}
              onClick={() => updatePage(e - 1)}
            >
              {e}
            </button>
          ))}
          <button
            type='button'
            className='btn ps-4 pe-3 h-30px fs-5 lh-1 btn-outline-dark'
            onClick={() => updatePage(pagination.PageIndex + 1)}
            disabled={!canNextPage}
          >
            <i className='fs-4 bi bi-chevron-left'></i>
          </button>
          <button
            type='button'
            className='btn ps-4 pe-3 h-30px fs-5 lh-1 btn-outline-dark'
            onClick={() => updatePage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <i className='fs-4 bi bi-chevron-double-left'></i>
          </button>
        </div>
      </div>
      <div className='table-footer-pagging'>
        <div className='d-flex flex-row'>
          <select
            title='اندازه صفحه'
            className='d-flex form-select w-150px h-40px'
            value={pagination.PageSize}
            onChange={(e) => {
              !!updateState &&
                updateState({
                  ...queryRequest?.state,
                  PageIndex:0,
                  PageSize: Number(e.target.value) || pagination.PageSize,
                });
            }}
          >
            {[5, 10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize} selected={pagination.PageSize == pageSize}>
                {pageSize} تایی
              </option>
            ))}
          </select>
          <div className='input-group'>
          <label className='input-group-text d-flex form-control h-40px w-50px ms-7'>برو به</label>
          <input
            type='number'
            className='form-control d-flex h-40px'
            placeholder='صفحه'
            value={pagination.PageIndex + 1}
            min={1}
            max={pageCount || 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              updatePage(page);
            }}
            style={{width: '50px'}}
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export {ListPagination};
