import { WithChildren } from "@/_metronic/helpers"
import { FC } from "react"


export const SeparatorTitle: FC<WithChildren> = ({ children }) => {

    return (
        <div className="separator my-4 position-relative">
            <span className="text-gray-800 fs-6 fw-bold bg-white pe-3 d-inline-block position-absolute" style={{ top: '-1rem' }}>{children}</span>
        </div>
    )
}