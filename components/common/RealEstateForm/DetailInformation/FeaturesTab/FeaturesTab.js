import housingFields from './housingFields';
import landFields from './landFields';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo } from 'react';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const FeaturesTab = (props) => {
  const {
    t,
    inputValues,
    handleFeatureItemCheckbox,
    tagOptions,
    initTags,
    isLoadingTag,
  } = props;

  if (isLoadingTag) {
    return t('common:elements.loading');
  }

  const fieldsInput = useMemo(() => {
    console.log('Input Values', inputValues.tags);
    console.log('Initial Values', initTags);
    console.log('Tag options', tagOptions);

    try {
      if (inputValues.category === 'agents') return;

      let serverSideFields = housingFields(t);
      if (inputValues.category === 'land') serverSideFields = landFields(t);

      for (let i = 0; i < tagOptions.length; i++) {
        serverSideFields[tagOptions[i].parentFilter].items.push(tagOptions[i]);
      }
      return serverSideFields;
    } catch (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('error:server-error-api')
      );
      return [];
    }
  }, [tagOptions, initTags]);

  useEffect(() => {
    console.log(inputValues?.tags);
  }, [inputValues?.tags]);

  return (
    <div className="tabs__wrapper">
      {!inputValues.category ? (
        <div className={'no__features'}>
          {t('real-estate-submit:form.no-features')}{' '}
        </div>
      ) : (
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
                          inputValues?.tags?.includes(item.id)
                            ? 'check'
                            : 'plus'
                        }
                        className="item__icon"
                      />{' '}
                      {t(`real-estate-tags:${item.nameTag}`)}
                    </label>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FeaturesTab;
