import React from 'react';
import { Row, Col } from 'react-bootstrap';

function ToggleNav(props) {
  const { toggles, activeToggle, setActiveToggle } = props;
  return (
    <Row className="toggle__nav">
      <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-1 pt-0 ">
        <div className="toggle__option nav nav-justified justify-content-center flex-row rounded  p-3 mb-0">
          {toggles.map((item) => (
            <div className={`option__item ml-1 mt-2`} key={item.key}>
              <div
                className={`nav-link rounded ${
                  activeToggle.key === item.key ? 'active' : ''
                }`}
                onClick={() => setActiveToggle(item)}
              >
                <div className="text-center py-1">
                  <h6 className="mb-0">{item.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default ToggleNav;
