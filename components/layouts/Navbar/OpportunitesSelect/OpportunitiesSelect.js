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
      <Dropdown.Toggle id="options" as={CustomToggle} aria-label="Add Listing">
        {t('navbar:opportunities.base')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="div">
          <Link id="real-estate" href="/real-estate">
            <a>{t('navbar:opportunities.real-estate')}</a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="div">
          <Link id="transport" href="/transport">
            <a>{t('navbar:opportunities.vehicles')}</a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="div">
          <Link id="jobs" href="/job-search">
            <a>{t('navbar:opportunities.job-search')}</a>
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OpportunitiesSelect;
