import mainScrapper from '../Scrappers';

const getMeetUpValues = async (URL: string) => {
  await mainScrapper();
  await mainScrapper.getAttendees(URL);
  await mainScrapper.exit();
};

export default getMeetUpValues;
