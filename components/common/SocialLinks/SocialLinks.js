import { SectionHeading, CustomFormControl } from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import { getPosition } from 'utils/standaloneFunctions';
import fields from './fields';

const SocialLinks = (props) => {
  const { t, inputValues, handleOnChange, prefix, initialItem } = props;
  const fieldsInput = fields(t);
  const socialPrefix = {
    facebookLink: 'https://facebook.com',
    twitterLink: 'https://twitter.com',
    youtubeLink: 'https://youtube.com',
    instagramLink: 'https://instagram.com',
  };
  const socialLinkCheck = (e, key) => {
    let socialLink = e.target.value;

    if (!socialLink) return;

    let urlIndex = 3;
    if (!socialLink.includes('http')) urlIndex = 1;
    let position = getPosition(socialLink, '/', urlIndex);
    let correctedString =
      socialPrefix[key] + socialLink.substring(position, socialLink.length);
    e.target.value = correctedString;
    handleOnChange(e);
  };
  return (
    <div className="form__section">
      <SectionHeading>{t('common:social.heading')}</SectionHeading>
      <Row>
        {fieldsInput.map((item) => (
          <Col lg={6} key={prefix + item.key}>
            <Form.Group>
              <CustomFormControl
                onBlur={(e) => socialLinkCheck(e, item.key)}
                onChange={handleOnChange}
                value={inputValues[prefix + item.key]}
                id={prefix + item.key}
                defaultValue={initialItem?.socialLinks[item.key]}
                valueLength={250 - inputValues[prefix + item.key]?.length}
                maxLength={'250'}
                type="text"
                style={{ resize: 'none' }}
                label={item.label}
                autoComplete="current-text"
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SocialLinks;
