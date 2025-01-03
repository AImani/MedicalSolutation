import { useState, useEffect } from "react";
import { getUser } from "../core/AuthHelpers";
import { AccessDto } from "../core/_models";

const usePermission = (list: AccessDto[]) => {
    const user = getUser();
    // const hasPermission = list.some(x => user?.SystemRoles.some(r => 
    //     r.Permissions.some(p => 
    //         p.ControllerName.toLowerCase() === x.ctrl.toLowerCase() 
    //         && (!!x.action? p.ActionName.toLowerCase() === x.action.toLowerCase(): true)
    //         //&& (x.type === undefined || x.type.toLowerCase() === p.ActionVerb.toLowerCase())
    //         )
    //     ))

    return true;
};

export default usePermission;