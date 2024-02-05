# Displaying Google Analytics reports using Chart.js

Get Google Analytics Reporting API v4 with OAuth2 and display data using Chart.js.

<img src="/public/line-chart.png" alt="line chart" />
<img src="/public/bar-chart.png" alt="bar chart" />

## Technologies used

- [Next.js](https://nextjs.org/)
- [Google Analytics API](https://developers.google.com/analytics/devguides/reporting/core/v4)
- [React Chartjs 2](https://github.com/jerairrest/react-chartjs-2)

## Run the app locally

1. Create project in [Google Developers Console](https://console.developers.google.com/)
2. Enable Google Analytics Reporting API.
3. Configure Google OAuth consent screen.
4. Clone this repo
6. Add your "CLIENT DATA" into .env file:

```shell
CLIENT_EMAIL="YOUR_CLIENT_EMAIL" 
PRIVATE_KEY="YOUR_PRIVATE_KEY"
PROPERTY_ID="YOUR_PROPERTY_ID"
```
   
7. Run 

```shell
npm install
```
9. Run

```shell
npm run dev
```

And then, Open http://localhost:3000 with your favorite browser to see your project.
