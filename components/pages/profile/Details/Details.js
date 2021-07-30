import { useState } from 'react';
import LeftTabs from './LeftTabs';
import RightContent from './RightContent';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const Details = (props) => {
  const { t, user, isMobile } = props;
  const [currentTab, setCurrentTab] = useState('profile');

  return (
    <div className="detail-container">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <LeftTabs
              currentTab={currentTab}
              user={user}
              setCurrentTab={setCurrentTab}
              t={t}
              isMobile={isMobile}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <RightContent
              currentTab={currentTab}
              user={user}
              t={t}
              isMobile={isMobile}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(Details);
