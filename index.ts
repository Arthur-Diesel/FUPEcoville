import 'dotenv/config'
import * as cron from 'node-cron'
import TwitterApi from 'twitter-api-v2'

export function log(message:string) {
    console.log(`INFO - FUPEcoville: ${new Date().toLocaleString()} | ${message}`)
}

log('Starting!')

const T = new TwitterApi({
    appKey: String(process.env.TWITTER_API_KEY),
    appSecret: String(process.env.TWITTER_API_KEY_SECRET),
    accessToken: String(process.env.TWITTER_ACCESS_TOKEN),
    accessSecret: String(process.env.TWITTER_ACCESS_TOKEN_SECRET),
});

const Twitter = T.v2;

cron.schedule('0 0 12 * * *', async () => {
    let dateVacations = new Date(String(process.env.FERIAS_UP))
    let todaysDate = new Date();
    let difference = dateVacations.getTime() - todaysDate.getTime()
    let differenceDays = Math.ceil(difference / (1000 * 3600 * 24))
    await Twitter.tweet(`Faltam ${differenceDays} dias até as ferias da UP.`)
    log('Novo Tweet!')
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
})