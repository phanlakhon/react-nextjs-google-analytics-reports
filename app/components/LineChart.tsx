import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js'

import styles from './../page.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend)

interface ChartProps {
  datasets: any
}

export function LineChart(props: ChartProps) {
  const { datasets } = props

  const data = {
    labels: datasets.labels,
    datasets: [
      {
        label: 'Page views',
        data: datasets.views,
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      },
      {
        label: 'Users',
        data: datasets.users,
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.4
      }
    ]
  }

  const options = {
    scales: {
      y: {
        min: 0
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {
            return 'my tittle'
          }
        }
      },
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Line Chart',
        position: 'top' as const
      }
    }
  }

  return (
    <div className={styles.chart_wrapper}>
      <Line data={data} options={options} />
    </div>
  )
}
