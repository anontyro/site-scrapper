import getMeetUpValues from './utils/meetUpScrapper';

const URL_LIST = {
  TALK_JS: 'https://www.meetup.com/Singapore-JS/',
  SINGAPORE_CSS: 'https://www.meetup.com/SingaporeCSS/',
};

getMeetUpValues(URL_LIST.SINGAPORE_CSS);
