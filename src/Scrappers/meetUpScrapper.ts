import mainScrapper from './BaseScrapper';

const getMeetUpValues = async (URL: string) => {
  await mainScrapper();
  const attendees = await mainScrapper.getMeetUpAttendees(URL);
  await mainScrapper.exit();
  return attendees;
};

export default getMeetUpValues;
