import { FC } from "react"
import { AccessDto } from "../core/_models"
import { WithChildren } from "@/_metronic/helpers"
import { getUser } from ".."
import { SuspensedView } from "@/app/routing/PrivateRoutes"

export const ComponentPermission: FC<{ list: AccessDto[] } & WithChildren> = ({ children, list }) => {
    const user = getUser();
    const hasPermission = list.some(x => user?.SystemRoles.some(r => r.Permissions.some(p => p.ControllerName.toLowerCase() === x.ctrl.toLowerCase() && p.ActionName.toLowerCase() === x.action.toLowerCase() && (x.type === undefined || x.type.toLowerCase() === p.ActionVerb.toLowerCase()))))

    return hasPermission
        ? <SuspensedView>{children}</SuspensedView>
        : (
            <div className="p-6">
                <h5 className="mb-8">عدم دسترسی</h5>
                <h6>
                    به این بخش دسترسی ندارید.
                </h6>
            </div>
        )
}