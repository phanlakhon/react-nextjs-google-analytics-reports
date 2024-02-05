'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { BarChart, LineChart } from './components'

import moment from 'moment'
import { find, isEmpty } from 'lodash'

export default function Home() {
  const isMounted = useRef(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [datasets, setDatasets] = useState<any>({})

  const mapping = (data: any) => {
    const dataList: any = []
    if (data?.rows && !data?.kind && !data?.error) {
      data.rows.map((v: any, k: number) => {
        dataList[k] = {
          month: v?.dimensionValues[0]?.value || '',
          views: v.metricValues[0]?.value,
          users: v.metricValues[1]?.value
        }
      })
    }

    return dataList
  }

  const getDatasets = (days: number, dataList: any) => {
    const currentDate = new Date()

    const labels: any = []
    const views: any = []
    const users: any = []

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() - i)
      const found: any = find(dataList, { month: `${moment(date).format('YYYYMMDD')}` })

      if (found) {
        views.push(Number(found.views))
        users.push(Number(found.users))
      } else {
        {
          views.push(0)
          users.push(0)
        }
      }

      const formattedDate = `${date.toLocaleString('en', { month: 'short' })} ${date.getDate()}`
      labels.push(formattedDate)
    }

    setDatasets({ ...{ labels, views, users } })

    return null
  }

  const getReports = async () => {
    const startDate = moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD')
    const response = await fetch(`/api/analytics-reports?startDate=${startDate}`)
    const data = await response.json()

    const dataList: any = await mapping(data)
    getDatasets(30, dataList)
  }

  const componentDidMount = useCallback(async () => {
    await new Promise(resolve => resolve(true)).then(getReports).then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true

      componentDidMount()
    }
  }, [])

  // useEffect(() => {
  //   console.log('datasets', datasets)
  // }, [datasets])

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Displaying Google Analytics reports using Chart.js.</h2>
      {!isLoading && datasets ? (
        <>
          <LineChart datasets={datasets} />
          <BarChart datasets={datasets} />
        </>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </main>
  )
}
