import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
} from 'react-icons/ai';

const fields = (t) => [
  {
    key: 'facebookLink',
    type: 'text',
    label: (
      <div>
        <AiFillFacebook /> {t('common:social.facebook')}
      </div>
    ),
  },
  {
    key: 'instagramLink',
    type: 'text',
    label: (
      <div>
        <AiFillInstagram /> {t('common:social.instagram')}{' '}
      </div>
    ),
  },
  {
    key: 'youtubeLink',
    type: 'text',
    label: (
      <div>
        <AiFillYoutube /> {t('common:social.youtube')}{' '}
      </div>
    ),
  },
  {
    key: 'twitterLink',
    type: 'text',
    label: (
      <div>
        <AiFillTwitterSquare /> {t('common:social.twitter')}{' '}
      </div>
    ),
  },
];

export default fields;
