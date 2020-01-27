import puppeteer from 'puppeteer';

let BROWSER: puppeteer.Browser | null = null;

const mainScrapper = async () => {
  BROWSER = await puppeteer.launch({
    headless: false,
  });
};

mainScrapper.getAttendees = async (url: string) => {
  console.log(`Getting Attendees from: ${url} `);
  if (!BROWSER) {
    return console.error('No browser set');
  }
  const page = await BROWSER.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const upcomingEventUrl = await page.evaluate(() => {
    console.log('Searching for next event...');
    const eventList = document.querySelector(
      '.groupHome-eventsList-upcomingEvents'
    );
    const eventLinkEl: any = eventList?.children[0]?.firstChild?.firstChild;
    return eventLinkEl ? eventLinkEl.href : null;
  });
  console.log(`Next Event URL: ${upcomingEventUrl}`);
};

mainScrapper.exit = async () => {
  if (BROWSER) {
    await BROWSER.close();
  }
};

mainScrapper.getBrowser = () => {
  if (BROWSER) {
    return BROWSER;
  }
  return null;
};

export default mainScrapper;
