import puppeteer from 'puppeteer';

interface Attendee {
  name: string;
  image: string;
}

const getAttendees = async (
  url: string,
  browser?: puppeteer.Browser | null
): Promise<Attendee[]> => {
  console.log(`Getting Attendees from: ${url} `);
  if (!browser) {
    console.error('No browser set');
    return [];
  }
  const page = await browser.newPage();
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
      const image = item?.firstChild?.children[0]?.getElementsByTagName(
        'img'
      )[0]?.src;
      const person: Attendee = {
        name,
        image,
      };
      output.push(person);
    }
    return output;
  });

  console.log(`Attendees list generated`);

  await page.close();
  return listOfAttendees;
};

export default getAttendees;
