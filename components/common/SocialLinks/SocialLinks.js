import { SectionHeading, CustomFormControl } from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import fields from './fields';

const SocialLinks = (props) => {
  const { t, inputValues, handleOnChange, prefix, initialItem } = props;
  const fieldsInput = fields(t);

  return (
    <div className="form__section">
      <SectionHeading>{t('common:social.heading')}</SectionHeading>
      <Row>
        {fieldsInput.map((item) => (
          <Col lg={6} key={prefix + item.key}>
            <Form.Group>
              <CustomFormControl
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
