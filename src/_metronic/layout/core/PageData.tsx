/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, createContext, useContext, useEffect, useState } from 'react'
import { WithChildren } from '../../helpers'
import { OnComplete } from 'react-countdown-circle-timer'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageCountDown {
  hasCountDown: boolean,
  countDown: number,
  onDone(): OnComplete | undefined
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void,
  pageCountDown?: PageCountDown,
  setPageCountDown?: (pageCountDown: PageCountDown | undefined) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => { },
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => { },
  setPageDescription: (_description: string) => { },
})

const PageDataProvider: FC<WithChildren> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [pageCountDown, setPageCountDown] = useState<PageCountDown | undefined>();

  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    pageCountDown,
    setPageCountDown
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props & WithChildren> = ({ children, description, breadcrumbs }) => {
  const { setPageTitle, setPageDescription, setPageBreadcrumbs } = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())

      const metaTitle = children ? `${children} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME
      document.title = metaTitle;
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: FC<WithChildren> = ({ children }) => {
  const { setPageDescription } = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export { PageDescription, PageTitle, PageDataProvider, usePageData }
