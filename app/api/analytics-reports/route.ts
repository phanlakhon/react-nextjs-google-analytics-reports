import { google } from 'googleapis'

export async function GET(req: any) {
  const urlParams = req.nextUrl.searchParams
  const startDate = urlParams.get('startDate')

  try {
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL as string,
      undefined,
      process.env.PRIVATE_KEY as string,
      ['https://www.googleapis.com/auth/analytics.readonly']
    )

    const result: any = await (google.analyticsdata('v1beta') as any).properties.runReport({
      auth: jwtClient,
      property: `properties/${process.env.PROPERTY_ID as string}`,
      resource: {
        dateRanges: [{ startDate: startDate || '30daysAgo', endDate: 'today' }], // format date '2024-01-31'
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }]
      }
    })

    const rows = result?.data?.rows || result.data

    return Response.json({ rows })
  } catch (error: any) {
    return Response.json({ error: error.message })
  }
}
