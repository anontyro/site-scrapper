import getMeetUpValues from './utils/meetUpScrapper';

const URL_LIST = {
  TALK_JS: 'https://www.meetup.com/Singapore-JS/',
  SINGAPORE_CSS: 'https://www.meetup.com/SingaporeCSS/',
};

(async () => {
  try {
    const meetUpList = await getMeetUpValues(URL_LIST.SINGAPORE_CSS);
    console.log(
      `First attendee is: ${meetUpList[0]?.name} with image: ${meetUpList[0]?.image}`
    );
  } catch (err) {
    console.error(err);
  }
})();
