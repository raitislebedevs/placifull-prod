import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="nav-item__link"
  >
    <Nav.Link className="nav-item__link">
      {children}{' '}
      <FontAwesomeIcon icon="chevron-down" className="dropdown-icon" />
    </Nav.Link>
  </div>
));

const OpportunitiesSelect = (props) => {
  const { t } = props;
  return (
    <Dropdown>
      <Dropdown.Toggle id="options" as={CustomToggle}>
        {t('navbar:opportunities.base')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link id="real-estate" href="/real-estate">
          <Dropdown.Item as="div">
            <a>{t('navbar:opportunities.real-estate')}</a>
          </Dropdown.Item>
        </Link>
        <Link id="transport" href="/transport">
          <Dropdown.Item as="div">
            <a>{t('navbar:opportunities.vehicles')}</a>
          </Dropdown.Item>
        </Link>
        <Link id="jobs" href="/job-search">
          <Dropdown.Item as="div">
            <a>{t('navbar:opportunities.job-search')}</a>
          </Dropdown.Item>
        </Link>
        {/* <Link id="jobs" href="/">
          <Dropdown.Item as="div">
            <a>{t('navbar:opportunities.travel')}</a>
          </Dropdown.Item>
        </Link> */}
        <Link id="jobs" href="/tools">
          <Dropdown.Item as="div">
            <a id="tools">{t('navbar:opportunities.tools')}</a>
          </Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OpportunitiesSelect;
