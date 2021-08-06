import { SubPageHeading } from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import housingFields from './housingFields';
import landFields from './landFields';

const Features = (props) => {
  const { t, listingItem } = props;
  const [featureFields, setFeatureFields] = useState([]);

  useEffect(() => {
    fieldsInput();
  }, [listingItem]);

  const fieldsInput = () => {
    if (listingItem.category === 'agents') return;

    let serverSideFields = housingFields(t);
    if (listingItem.category === 'land') serverSideFields = landFields(t);

    for (let i = 0; i < listingItem.tags.length; i++) {
      serverSideFields[listingItem.tags[i].parentFilter]?.items.push(
        listingItem.tags[i]
      );
    }
    setFeatureFields(serverSideFields);
  };

  return (
    <>
      {listingItem?.tags.length > 0 && (
        <div className="left-section__features">
          <SubPageHeading className="features__heading">
            {t('real-estate-common:features.heading')}
          </SubPageHeading>
          <div className="features__wrapper">
            {Object.keys(featureFields).map((category, index) => (
              <div key={index}>
                {featureFields[category]?.items[0] && (
                  <Row className="features__items">
                    <Col
                      className="category__header"
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      {' '}
                      <div>{featureFields[category].label}</div>
                    </Col>
                    {featureFields[category].items.map((item, index) => (
                      <Col
                        xl={3}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={6}
                        className="items__wrapper"
                        key={index}
                      >
                        <FontAwesomeIcon
                          icon="check"
                          className="wrapper__icon"
                        />
                        {t(`real-estate-tags:${item?.nameTag}`)}
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
