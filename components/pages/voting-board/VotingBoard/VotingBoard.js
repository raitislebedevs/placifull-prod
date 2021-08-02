import React from 'react';
import { withTranslation } from 'i18n';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiUpvote, BiDownvote } from 'react-icons/bi';

const VotingBoard = (props) => {
  const { t } = props;

  return (
    <Container className="voting_container">
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          className={'feature_suggestion'}
        >
          <h3 className={'suggestion_title'}>Title Of Suggestion 1</h3>
          <div className={'separator'}></div>
          <div className={'suggestion__text'}>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            mattis rhoncus urna neque viverra justo. Amet facilisis magna etiam
            tempor orci eu lobortis. Viverra suspendisse potenti nullam ac.
            Tempus egestas sed sed risus. Tempor commodo ullamcorper a lacus
            vestibulum sed arcu. Pharetra diam sit amet nisl. Nisl vel pretium
            lectus quam id. Nisi lacus sed viverra tellus in hac habitasse
            platea dictumst. Mauris augue neque gravida in fermentum. Eu
            facilisis sed odio morbi quis commodo odio aenean. Libero nunc
            consequat interdum varius sit amet. Eros in cursus turpis massa
            tincidunt dui ut. Cursus eget nunc scelerisque viverra mauris. Id
            cursus metus aliquam eleifend mi in nulla posuere sollicitudin.
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
          <div className={'vote_count'}>
            <h6 className={'info__text'}>Current score</h6>
            <div className={'upvote__count'}>
              {' '}
              <BsFillPersonFill />
              <span className={'upvotes'}>1655</span>
            </div>
          </div>
          <div className={'up_down_button'}>
            <h6 className={'info__text'}>Voting options</h6>
            <div className={'voting__options'}>
              <span className={'upvote'}>
                <BiUpvote /> UP
              </span>
              <span className={'downvote'}>
                <BiDownvote /> DOWN
              </span>
            </div>
          </div>
          <div className={'rating_container'}>
            <h6 className={'rating'}>Rating</h6>
            <Rating
              stop={5}
              initialRating={3.5}
              className="voting__ratings"
              fullSymbol={<FaStar className="ratings__icon" />}
              emptySymbol={<FaRegStar className="ratings__icon" />}
            />
            <span className={'count'}>4.3</span>
          </div>
          <div className={'vote_button'}>VOTE</div>
        </Col>
      </Row>
    </Container>
  );
};

export default withTranslation('voting-board')(VotingBoard);
