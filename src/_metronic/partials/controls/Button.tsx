export function Button({
    actionsLoading = false, 
    children, 
    ...props}: any) {
    return (
        <button {...props}>   
            <i className={actionsLoading ?
                "fal fa-circle-notch fa-spin" :
                `fas fa-${props.icon}`}
                style={{paddingLeft:"0", marginLeft:"0.35rem"}}></i>
            {children}
        </button>
    )
}