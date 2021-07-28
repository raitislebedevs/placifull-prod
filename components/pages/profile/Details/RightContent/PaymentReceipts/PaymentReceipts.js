import { Row, Col, Form, Table } from 'react-bootstrap';
import { RiCalendar2Line } from 'react-icons/ri';
import Datetime from 'react-datetime';

const PaymentReceipts = (props) => {
  const { t } = props;
  const generatePdf = () => {};
  return (
    <div className="right-content__browse-cv" id={'YourElementId'}>
      <div className="browse-cv__heading">
        {/* {t('right-content.real-estate.title')} */}
        Payment Receipts
      </div>
      <Row className="browse-cv__filter-area pl-2 pr-2 pt-2">
        <Col xl={4} lg={6} md={6} sm={6} xs={6} className={'pr-2 pl-2'}>
          <Form.Group>
            <RiCalendar2Line />
            <Datetime
              dateFormat
              // onChange={(e) =>
              //   handleOnChange({ target: { value: e, id: item.key } })
              // }
              timeFormat={false}
              renderInput={(props) => {
                return (
                  <>
                    <Form.Control
                      {...props}
                      id={'start_date'}
                      placeholder={'Select Start Date'}
                    />
                  </>
                );
              }}
            />
          </Form.Group>
        </Col>

        <Col xl={4} lg={6} md={6} sm={6} xs={6} className={'pr-2 pl-2'}>
          <Form.Group>
            <RiCalendar2Line />
            <Datetime
              dateFormat
              // onChange={(e) =>
              //   handleOnChange({ target: { value: e, id: item.key } })
              // }
              timeFormat={false}
              renderInput={(props) => {
                return (
                  <Form.Control
                    {...props}
                    id={'end_date'}
                    placeholder={'Select Start Date'}
                  />
                );
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="browse-cv__result-area">
        <Table hover>
          <thead>
            <tr>
              <th>
                <Form.Check label={``} />
              </th>
              <th>Order #</th>
              <th>Date</th>
              <th>Billing For</th>
              <th>Payment Type</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check label={``} />
              </td>
              <td>2324</td>
              <td>May 11, 2021</td>
              <td>Priemer</td>
              <td>Bank Transfer</td>
              <td>10,000$</td>
              <td>
                <button className="btn btn-sm result__area-status paid">
                  Paid
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => generatePdf()}
                >
                  Details
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Check label={``} />
              </td>
              <td>2324</td>
              <td>May 11, 2021</td>
              <td>Priemer</td>
              <td>Bank Transfer</td>
              <td>10,000$</td>
              <td>
                <button className="btn btn-sm result__area-status not_paid">
                  Not Paid
                </button>
              </td>
              <td>
                <button className="btn btn-outline-primary btn-sm">
                  {' '}
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default PaymentReceipts;
