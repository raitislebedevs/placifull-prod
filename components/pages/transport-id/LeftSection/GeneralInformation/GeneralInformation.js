import { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { SectionHeading } from 'components/common';
import { connect } from 'react-redux';
import inputFields from './inputFields';
import { TransportListingService } from 'services/index';
import useListingCurrency from 'hooks/useListingCurrency';
import useBid from 'hooks/useBid';

const GeneralInformation = (props) => {
  const { t, listingItem, user } = props;

  const [bidPrice, setBidPrice] = useState();
  const [listingCurrency] = useListingCurrency(listingItem);
  const fields = inputFields(t, listingItem, listingCurrency);
  const [isLoading, handleSubmit] = useBid(
    t,
    bidPrice,
    TransportListingService,
    user,
    listingItem
  );

  return (
    <div className="left-section__general-info">
      <SectionHeading className="general-info__heading">
        {t('transport-detail:general-info.heading')}
      </SectionHeading>
      <div className="general-info__items">
        <Row>
          {fields.map(
            (field) =>
              field?.value && (
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  key={field.key}
                  className="items__col"
                >
                  <Row className="items__wrapper">
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div className="wrapper__heading">{field.label}</div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div className="wrapper__value">{field.value}</div>
                    </Col>
                  </Row>
                </Col>
              )
          )}
          <Col lg={12} md={12} className="mt-3">
            <Form className="items__form" onSubmit={handleSubmit}>
              <Row>
                <Col lg={4} md={4} sm={6} xs={12} className="items__col">
                  <div className={'offer__price'}>
                    {t('transport-detail:general-info.bid-price')}
                  </div>
                </Col>
                <Col lg={5} md={5} sm={6} xs={12} className="items__col">
                  <Form.Group>
                    <NumberFormat
                      customInput={Form.Control}
                      id="bidPrice"
                      className="form__input-value"
                      value={bidPrice}
                      placeholder={t(
                        'transport-detail:general-info.bid-placeholder'
                      )}
                      onValueChange={(e) => setBidPrice(e.floatValue)}
                      autoComplete="current-text"
                      thousandSeparator={true}
                      allowNegative={false}
                      isAllowed={(values) =>
                        values.value >= 0 && values.value <= 9999999999999999
                      }
                      prefix={`${listingCurrency} `}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12} className="items__col">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="form__button btn-block"
                  >
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                      />
                    ) : (
                      <>{t('transport-detail:general-info.submit')}</>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(GeneralInformation);
