import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { VacancyListingService } from 'services';
import { CustomFormControl } from 'components/common';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import NumberFormat from 'react-number-format';
import {
  getAvarageBid,
  getHigehstBid,
  getLowestBid,
} from 'utils/highestLowsetBids';

const ApplicantForm = (props) => {
  const {
    t,
    applicants,
    user,
    id,
    isPreview,
    currency,
    heading,
    listingItem,
    setApplicantForm,
    setJustApplied,
  } = props;
  const [appliedCount, setAppliedCount] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);

  const [salary, setSalary] = useState(0);

  const updateVacancyListing = async (event) => {
    event.preventDefault();
    if (isPreview) {
      return TostifyCustomContainer('info', t('common:toast.cannot-apply'));
    }
    setHasApplied(true);

    if (!salary) {
      setHasApplied(false);
      return TostifyCustomContainer('info', t('common:toast.bidding-price'));
    }

    try {
      let biddingUser = {};
      biddingUser.email = user?.email;
      biddingUser.phone = user?.userInfo?.phone;

      let highestBid = getHigehstBid(listingItem, biddingUser, salary);
      let lowestBid = getLowestBid(listingItem, biddingUser, salary);
      let avarageProposol = getAvarageBid(listingItem, salary);

      console.log(avarageProposol);

      const { PersonalDetails } = user?.curriculumVitae;
      let fullName = `${PersonalDetails?.cvFirstName} ${PersonalDetails?.cvLasttName}`;

      let payload = {
        Applicants: [
          ...applicants,
          {
            fullName,
            cv: user?.curriculumVitae,
            index: appliedCount,
            proposedSalary: salary,
            email: user?.email || null,
            phoneNumber: PersonalDetails?.cvPhoneNumber || null,
            appliedDate: new Date(),
          },
        ],
        bidOffer: {
          ...highestBid,
          ...lowestBid,
          ...avarageProposol,
        },
      };

      console.log(payload);

      const { data, error } = await VacancyListingService.UPDATE(id, payload);
      if (!error)
        TostifyCustomContainer(
          'success',
          t('job-application:job-apply.toast.success')
        );

      if (error) return TostifyCustomContainer('error', error?.message);
    } catch (error) {
      TostifyCustomContainer('error', error);
    }
    setJustApplied(true);
    setHasApplied(false);
    setApplicantForm(false);
  };

  useEffect(() => {
    let applicant = applicants?.filter(
      (item) => item?.cv?._id == user?.curriculumVitae?._id
    )[0];

    if (applicant) {
      TostifyCustomContainer('info', t('common:toast.already-applied'));
      setHasApplied(true);
    }

    let count = applicants?.reduce(
      (a, v) => (v.column === 'applicants' ? a + 1 : a),
      0
    );

    setAppliedCount(count);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          {t('job-application:job-apply.heading')} {'  '}
          <strong>{heading}</strong>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4} md={4} sm={4} xs={4} className={'form__item'}>
              {t('job-application:job-apply.proposed-salary')}
            </Col>
            <Col lg={8} md={8} sm={8} xs={8} className="form__item">
              <Form.Group>
                <NumberFormat
                  customInput={CustomFormControl}
                  id={'salary'}
                  value={salary}
                  className="form__input"
                  label={'Salary'}
                  thousandSeparator={true}
                  decimalScale={2}
                  allowNegative={false}
                  fixedDecimalScale={true}
                  thousandsGroupStyle="thousand"
                  onValueChange={(event) => {
                    setSalary(event?.floatValue);
                  }}
                  autoComplete="current-text"
                  isAllowed={(values) =>
                    values.value >= 0 && values.value <= 999999999
                  }
                  prepend={{ values: [currency] }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} disabled={hasApplied}>
            {' '}
            {t('job-application:job-apply.close')}
          </Button>
          {hasApplied ? (
            <Button disabled={true}>
              {t('job-application:job-apply.applying')}
            </Button>
          ) : (
            <Button
              onClick={(event) => {
                updateVacancyListing(event);
              }}
              disabled={hasApplied}
            >
              {t('job-application:job-apply.apply')}
            </Button>
          )}
        </Modal.Footer>
      </>
    </Modal>
  );
};
export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ApplicantForm);
