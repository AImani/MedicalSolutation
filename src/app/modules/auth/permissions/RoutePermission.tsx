import { FC } from "react"
import { AccessDto } from "../core/_models"
import { WithChildren } from "@/_metronic/helpers"
import { getUser } from ".."
import { SuspensedView } from "@/app/routing/PrivateRoutes"
import { Card } from "react-bootstrap"

export const RoutePermission: FC<{ list: AccessDto[] } & WithChildren> = ({ children, list }) => {
    const user = getUser();
    const hasPermission = list.some(x => user?.SystemRoles.some(r => r.Permissions.some(p => p.ControllerName.toLowerCase() === x.ctrl.toLowerCase() && p.ActionName.toLowerCase() === x.action.toLowerCase() && (x.type === undefined || x.type.toLowerCase() === p.ActionVerb.toLowerCase()))))

    return hasPermission ? <SuspensedView>{children}</SuspensedView> :
        <Card>
            <Card.Header>
                <Card.Title>
                    عدم دسترسی
                </Card.Title>
            </Card.Header>
            <Card.Body className="fs-5">
                به این صفحه دسترسی ندارید.
            </Card.Body>
        </Card>;
}