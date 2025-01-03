import { useEffect } from "react";

export type HtmlMetaDataProps = {
  title: string,
  description?: string,
  keywords?: string
}
export const HtmlMetaData = ({ title, description, keywords }: HtmlMetaDataProps) => {
  useEffect(() => {
    const metaTitle = title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME
    document.title = metaTitle;
  }, [])

  return (<></>)
}

