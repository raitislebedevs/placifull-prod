import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import {
  CurriculamVitaes,
  CustomFormControl,
  SelectInputSubmit,
  CurrencyInput,
} from 'components/common';
import ReactPaginate from 'react-paginate';
import { AiOutlineFileSearch } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import fields from './fields';
import { CurriculumVitaesService } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { cleanObject } from 'utils/standaloneFunctions';
import guidGenerator from 'utils/guidGenerator';

const noCV = '/static/images/no-listings/CV.png';

const BrowseCV = (props) => {
  const { t } = props;
  const peopleCv = fields(t);
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(1);
  const [inputValues, setInputValues] = useState({});
  const [submitCurrency, setsubmitCurrency] = useState('');
  const [clearIds, setClearIds] = useState([]);
  const [applicantCvs, setApplicantCvs] = useState([]);
  const [applicantCv, setApplicantCv] = useState({});
  const [viewApplicant, setViewApplicant] = useState('');
  const [showCv, setShowCv] = useState(false);
  const [isSearching, setiIsSearching] = useState(false);
  let cvCount = 1;

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const postMultiSelection = (event) => {
    var arrayValues = [];
    event?.values.forEach((element) => {
      arrayValues.push(element?.value);
    });

    handleOnChange({
      target: {
        id: event?.id,
        value: arrayValues,
      },
    });
  };

  const searchApplicants = async () => {
    setiIsSearching(true);
    let filter = {
      ...cleanObject({
        'currency.id': inputValues?.searchCurrency || null,
        published: true,
      }),
    };

    let search = {
      ...cleanObject({
        EducationHistory: inputValues?.educationFit || null,
        WorkExpectations: inputValues?.workExpectations || null,
        WorkExpierience: inputValues?.workExpierience || null,
        seniority: inputValues?.seniority || null,
        salary: inputValues?.salaryFrom || null,
      }),
    };
    try {
      const { data, error } = await CurriculumVitaesService.FIND_FORM({
        _limit: limit,
        _start: skip,
        _where: filter || null,
        _search: search || null,
        //_sort: sort || 'insertDate:asc',
      });

      if (data) {
        setApplicantCvs(data);
        setTotal(data.length || 1);
      }
    } catch (error) {
      TostifyCustomContainer('error', t('common:toast.messages.error'), error);
    }
    setiIsSearching(false);
  };

  const getUserCV = async (id) => {
    setViewApplicant(id);
    try {
      const { data, error } = await CurriculumVitaesService.GET(id);
      if (data) {
        setApplicantCv(data);
      }
      setShowCv(true);
    } catch (error) {
      TostifyCustomContainer('error', t('common:toast.messages.error'), error);
    }

    setViewApplicant('');
  };
  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  useEffect(() => {
    searchApplicants();
    cvCount = 1;
  }, []);

  return (
    <div className="right-content__browse-cv">
      <div className="browse-cv__heading">
        {t('profile:right-content.browser-cv.browser')}
      </div>
      <Row className="browse-cv__filter-area">
        {peopleCv?.map((item) => {
          if (item.type === 'number') {
            return (
              <Col lg={5} md={5} sm={6} key={item.key}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: item.key,
                        },
                      };
                      handleOnChange(payload);
                    }}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prefix={
                      submitCurrency
                        ? submitCurrency + ' '
                        : t('common:currency.no-currency') + ' '
                    }
                    suffix={t('profile:right-content.browser-cv.monthly')}
                  />
                </Form.Group>
              </Col>
            );
          }

          if (item.type === 'selectMulti') {
            return (
              <Col lg={6} xl={6} md={6} sm={6} xs={12} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.key}
                    clearIds={clearIds}
                    onChange={(event) => {
                      postMultiSelection({
                        id: item.key,
                        //value
                        values: event,
                      });
                    }}
                    maxLength={7}
                    isSearchable={true}
                    isMulti={item?.isMulti}
                    options={item.options}
                    placeholder={item.label}
                  />
                </Form.Group>
              </Col>
            );
          }
        })}

        <Col lg={4} md={4} sm={12}>
          <Form.Group>
            <CurrencyInput
              handleOnChange={handleOnChange}
              setCurrency={setsubmitCurrency}
              placeholder={t('common:currency.currency-label')}
              currencyId={'searchCurrency'}
            />
          </Form.Group>
        </Col>
        <Col lg={3} xl={3} md={3} sm={6} xs={12}>
          <Button
            type="button"
            className=" btn-block"
            onClick={() => searchApplicants()}
          >
            {isSearching ? (
              <div>
                <Spinner
                  as="span"
                  animation="border"
                  variant="light"
                  size="sm"
                  role="status"
                />
              </div>
            ) : (
              t('profile:right-content.browser-cv.search')
            )}
          </Button>
        </Col>
      </Row>

      <div className="browse-cv__result-area">
        {isSearching ? (
          <div className="items__loading">
            <Spinner
              as="span"
              animation="border"
              variant="danger"
              size="lg"
              role="status"
            />
          </div>
        ) : (
          <>
            {' '}
            {applicantCvs?.length === 0 ? (
              <div className={'listings__not__placed'}>
                <img
                  src={noCV}
                  id="logo"
                  className="mx-auto d-block"
                  alt="CV"
                />
              </div>
            ) : (
              <>
                <Table hover>
                  <thead>
                    <tr>
                      {/*<th>
                <Form.Check label={``} />
              </th>*/}
                      <th>
                        {' '}
                        {t('profile:right-content.browser-cv.result-table.nr')}
                      </th>
                      <th>
                        {' '}
                        {t(
                          'profile:right-content.browser-cv.result-table.name'
                        )}
                      </th>
                      <th>
                        {' '}
                        {t(
                          'profile:right-content.browser-cv.result-table.email'
                        )}
                      </th>
                      <th>
                        {' '}
                        {t(
                          'profile:right-content.browser-cv.result-table.phone'
                        )}
                      </th>
                      <th className={'minimum_wide'}>
                        {' '}
                        {t(
                          'profile:right-content.browser-cv.result-table.worked-as'
                        )}
                      </th>
                      <th>
                        {' '}
                        {t(
                          'profile:right-content.browser-cv.result-table.salary'
                        )}
                      </th>
                      <th>
                        {' '}
                        {t('profile:right-content.browser-cv.result-table.cv')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*<th>
                  <Form.Check label={``} />
                </th>*/}

                    {applicantCvs?.map((applicant) => {
                      return (
                        <tr key={guidGenerator()}>
                          <th>{cvCount++}</th>
                          <td>
                            {applicant?.PersonalDetails?.cvFirstName &&
                            applicant?.PersonalDetails?.cvLasttName
                              ? `${applicant?.PersonalDetails?.cvFirstName} ${applicant?.PersonalDetails?.cvLasttName}`
                              : applicant?.PersonalDetails?.cvFirstName}
                          </td>
                          <td>
                            {applicant?.PersonalDetails?.cvPersonalEmail &&
                              applicant?.PersonalDetails?.cvPersonalEmail}
                          </td>
                          <td>
                            {' '}
                            {applicant?.PersonalDetails?.cvPhoneNumber &&
                              applicant?.PersonalDetails?.cvPhoneNumber}
                          </td>
                          <td>
                            {' '}
                            {applicant?.WorkExpierience?.map((item, index) => {
                              if (index > 1) {
                                return;
                              }
                              if (index > 0) {
                                return <div key={guidGenerator()}>...</div>;
                              }
                              return (
                                <div key={guidGenerator()}>
                                  {item?.positionName}
                                </div>
                              );
                            })}
                          </td>
                          <td>
                            {applicant?.WorkExpectations[0]?.monthly &&
                            applicant?.currency?.symbol
                              ? `${applicant?.currency?.symbol} ${applicant?.WorkExpectations[0]?.monthly}`
                              : '-'}
                          </td>
                          <td>
                            {viewApplicant === applicant?.id ? (
                              <Button
                                className="btn-outline btn-sm"
                                onClick={() => getUserCV(applicant?.id)}
                              >
                                <Spinner
                                  as="span"
                                  animation="border"
                                  variant="light"
                                  size="sm"
                                  role="status"
                                />
                              </Button>
                            ) : (
                              <Button
                                className="btn-outline btn-sm"
                                onClick={() => getUserCV(applicant?.id)}
                              >
                                <AiOutlineFileSearch />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>{' '}
              </>
            )}
          </>
        )}
      </div>
      <CurriculamVitaes
        curriculamVitaes={applicantCv}
        show={showCv}
        setShowCv={setShowCv}
        onHide={() => setShowCv(false)}
      />

      <div className="search-result__paginate">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={Math.ceil(total / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'page-item'}
          activeClassName={'page-item active'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          pageClassNam={'page-item'}
          pageLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
};
export default BrowseCV;
