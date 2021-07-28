import PropTypes from 'prop-types'
import { withTranslation } from '../i18n'

const Error = ({ t }) => (
  <p>
    {t('heading')}
  </p>
)

Error.getInitialProps = async ({ res, err }) => {
  return {
    namespacesRequired: ['common', 'not-found', 'navbar', 'footer'],
  }
}

Error.propTypes = {
  t: PropTypes.func.isRequired
}

export default withTranslation('not-found')(Error)