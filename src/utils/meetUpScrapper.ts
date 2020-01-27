import mainScrapper from '../Scrappers';

const getMeetUpValues = async (URL: string) => {
  await mainScrapper();
  const attendees = await mainScrapper.getAttendees(URL);
  console.log(`First attendee is: ${attendees[0]?.name}`);
  await mainScrapper.exit();
};

export default getMeetUpValues;
