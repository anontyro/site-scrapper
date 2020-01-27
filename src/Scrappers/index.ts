import puppeteer from 'puppeteer';

let BROWSER: puppeteer.Browser | null = null;

interface Attendee {
  name: string;
  image: string;
}

const mainScrapper = async () => {
  BROWSER = await puppeteer.launch({
    headless: false,
  });
};

mainScrapper.getAttendees = async (url: string): Promise<Attendee[]> => {
  console.log(`Getting Attendees from: ${url} `);
  if (!BROWSER) {
    console.error('No browser set');
    return [];
  }
  const page = await BROWSER.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const upcomingEventUrl: string | null = await page.evaluate(() => {
    console.log('Searching for next event...');
    const eventList = document.querySelector(
      '.groupHome-eventsList-upcomingEvents'
    );
    const eventLinkEl: any = eventList?.children[0]?.firstChild?.firstChild;
    return eventLinkEl ? eventLinkEl.href : null;
  });

  if (!upcomingEventUrl) {
    console.warn('No upcoming events');
    return [];
  }
  console.log(`Next Event URL: ${upcomingEventUrl}`);

  await page.goto(`${upcomingEventUrl}attendees`, {waitUntil: 'networkidle2'});

  const listOfAttendees: any[] = await page.evaluate(() => {
    const output: Attendee[] = [];

    console.log('Getting attendees list...');
    const unorderedList = document.querySelector('.attendees-list')?.children;

    if (!unorderedList) {
      console.warn('No attendees found');
      return [];
    }

    const attendeeLength = unorderedList.length;
    for (let i = 0; i < attendeeLength; i++) {
      const item: any = unorderedList[i];
      const name: any = item.children[0]?.children[0]?.innerText;
      const person: Attendee = {
        name,
        image: '',
      };
      output.push(person);
    }

    return output;
  });

  console.log(`Full Attendees List: ${listOfAttendees}`);

  return listOfAttendees;
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
