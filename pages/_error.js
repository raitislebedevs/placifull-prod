import { withTranslation } from '../i18n';

const Error = ({ t }) => <p>{t('not-found.found')}</p>;

export default withTranslation('not-found')(Error);
