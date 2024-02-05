import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, PointElement, BarElement, Title, Legend } from 'chart.js'

import styles from './../page.module.css'

ChartJS.register(CategoryScale, PointElement, BarElement, Title, Legend)

interface ChartProps {
  datasets: any
}

export function BarChart(props: ChartProps) {
  const { datasets } = props

  const data = {
    labels: datasets.labels,
    datasets: [
      {
        label: 'Page views',
        data: datasets.views,
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      },
      {
        label: 'Users',
        data: datasets.users,
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
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
        text: 'Bar Chart',
        position: 'top' as const
      }
    }
  }

  return (
    <div className={styles.chart_wrapper}>
      <Bar data={data} options={options} />
    </div>
  )
}
