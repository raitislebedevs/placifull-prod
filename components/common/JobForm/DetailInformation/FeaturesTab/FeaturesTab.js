import fields from './fields';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';

const FeaturesTab = (props) => {
  const {
    t,
    inputValues,
    handleFeatureItemCheckbox,
    tagOptions,
    isLoadingTag,
  } = props;

  if (isLoadingTag) {
    return 'loading...';
  }

  const fieldsInput = useMemo(() => {
    let f = fields(t);
    for (let i = 0; i < tagOptions.length; i++) {
      f[tagOptions[i].parentFilter].items.push(tagOptions[i]);
    }
    return f;
  }, [inputValues.tags]);

  return (
    <div className="tabs__wrapper">
      <Row>
        {Object.keys(fieldsInput).map((category, index) => (
          <Col lg={12} md={6} key={index}>
            <div className="wrapper__category">
              <div className="category__header">
                {fieldsInput[category].label}:
              </div>
              <div className="category__items-wrapper">
                {fieldsInput[category].items.map((item, index) => (
                  <label
                    key={index}
                    className={`items-wrapper__item ${
                      inputValues?.tags?.includes(item.id)
                        ? 'items-wrapper__item--active'
                        : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={inputValues?.tags?.includes(item.id)}
                      onChange={handleFeatureItemCheckbox}
                      id={item.id}
                    />
                    <FontAwesomeIcon
                      icon={
                        inputValues?.tags?.includes(item.id) ? 'check' : 'plus'
                      }
                      className="item__icon"
                    />{' '}
                    {t(`job-tags:${item.nameTag}`)}
                  </label>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesTab;
