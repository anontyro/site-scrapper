import puppeteer from 'puppeteer';
import getAttendees from './meetup';

let BROWSER: puppeteer.Browser | null = null;

/**
 * Main setup function that will setup puppeteer with no headless by default
 * accepts additional params
 * @param opts additional options to change the way puppeteer reacts
 */
const mainScrapper = async (opts: {} = {}) => {
  BROWSER = await puppeteer.launch({
    headless: false,
    ...opts,
  });
};

/**
 *
 */
mainScrapper.getMeetUpAttendees = async (url: string) =>
  await getAttendees(url, BROWSER);

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
