const Loader = ({loading, color = 'text-light'}: any) => {
    return loading ? <span className={'spinner-border spinner-border-sm ' + color}></span> : <></>;
  };
  
  export default Loader;
  