import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { VotingBoardService } from 'services/index';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const VotingBoard = (props) => {
  const { t, user } = props;
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(45);
  const [rating, setRating] = useState(45);
  const [votingItems, setVotingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votingOption, setVotingOption] = useState('');
  const [voteItem, setVoteItem] = useState('');

  const handleVote = async (votingItem) => {
    if (votingItem.id !== voteItem) {
      TostifyCustomContainer('info', t('voting-board:toast.idea'));
      return;
    }

    if (!rating) {
      TostifyCustomContainer('info', t('voting-board:toast.rate'));
      return;
    }

    if (!votingOption) {
      TostifyCustomContainer('info', t('voting-board:toast.up-down'));
      return;
    }

    if (!user.id) {
      TostifyCustomContainer('info', t('voting-board:toast.log-in'));
      return;
    }

    setIsVoting(true);
    try {
      let votedUserList = votingItem?.votedUsers || [];
      const rate = votingItem?.rating || 0;
      let votes = votingItem?.endVotes || 0;

      if (votingOption === 'down' && votes <= 1) {
        setIsVoting(false);
        return;
      }

      if (votingOption === 'up') {
        votes++;
      }

      if (votingOption === 'down' && votes > 1) {
        votes--;
      }

      if (votedUserList.filter((item) => item == user.id).length > 0) {
        setIsVoting(false);
        TostifyCustomContainer('info', t('voting-board:toast.voted'));
        return;
      }

      votedUserList.push(user.id);

      const rating = rating;
      const totalRaters = votingItem?.totalRaters || 0;

      let newRate =
        parseFloat(
          ((rate + rating * totalRaters) / (totalRaters + 1)).toFixed(1)
        ) || rate;

      let payload = {
        rating: newRate,
        totalRaters: totalRaters + 1,
        endVotes: votes,
        votedUsers: votedUserList,
      };

      await VotingBoardService.UPDATE(votingItem.id, payload);

      getUserSuggestions();
    } catch (error) {
      setIsVoting(false);
    }
    setIsVoting(false);
  };

  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  useEffect(async () => {
    await getSuggestionCount();
    getUserSuggestions();
  }, [limit, skip]);

  const getSuggestionCount = async () => {
    try {
      setIsLoading(true);
      const count = await VotingBoardService.COUNT();
      setTotal(count.data);
    } catch (e) {}
  };

  const getUserSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await VotingBoardService.FIND({
        _limit: limit,
        _start: skip,
        _sort: 'endVotes:desc',
      });
      if (data) {
        setVotingItems(data);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleChoosenOption = (option, id) => {
    if (id === voteItem) {
      setVotingOption(option);
      setVoteItem(id);
      return;
    }

    setVotingOption(option);
    setVoteItem(id);
    setRating(0);
  };

  const handleRatingChange = (e, id) => {
    console.log(e);
    if (id === voteItem) {
      setRating(e);
      setVoteItem(id);
      return;
    }

    setRating(e);
    setVoteItem(id);
    setVotingOption('');
  };

  return (
    <>
      {!isLoading == true ? (
        <>
          {votingItems?.map((item) => {
            return (
              <Container className="voting_container" key={item.id}>
                <Row>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    className={'feature_suggestion'}
                  >
                    <h3 className={'suggestion_title'}>{item.title}</h3>
                    <div className={'separator'}></div>
                    <div className={'suggestion__text'}>{item.description}</div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
                    <div className={'vote_count'}>
                      <h6 className={'info__text'}>
                        {t('voting-board:item.score')}
                      </h6>
                      <div className={'upvote__count'}>
                        {' '}
                        <BsFillPersonFill />
                        <span className={'upvotes'}>{item.endVotes}</span>
                      </div>
                    </div>
                    <div className={'up_down_button'}>
                      <h6 className={'info__text'}>
                        {t('voting-board:item.options')}
                      </h6>
                      <div className={'voting__options'}>
                        <span
                          className={`upvote ${
                            votingOption === 'up' && voteItem === item.id
                              ? 'selected'
                              : ''
                          }`}
                        >
                          <BiUpvote
                            onClick={() => handleChoosenOption('up', item.id)}
                            onTouchStart={() =>
                              handleChoosenOption('up', item.id)
                            }
                          />{' '}
                          {t('voting-board:item.up')}
                        </span>
                        <span
                          className={`downvote ${
                            votingOption === 'down' && voteItem === item.id
                              ? 'selected'
                              : ''
                          }`}
                        >
                          <BiDownvote
                            onClick={() => handleChoosenOption('down', item.id)}
                            onTouchStart={() =>
                              handleChoosenOption('down', item.id)
                            }
                          />{' '}
                          {t('voting-board:item.down')}
                        </span>
                      </div>
                    </div>
                    <div className={'rating_container'}>
                      <h6 className={'rating'}>
                        {t('voting-board:item.rating')}
                      </h6>
                      <Rating
                        stop={5}
                        fractions={8}
                        initialRating={
                          voteItem === item.id && rating ? rating : item.rating
                        }
                        onChange={(e) => {
                          handleRatingChange(e, item.id);
                        }}
                        onTouchStart={(e) => {
                          handleRatingChange(e, item.id);
                        }}
                        className="voting__ratings"
                        fullSymbol={<FaStar className="ratings__icon" />}
                        emptySymbol={<FaRegStar className="ratings__icon" />}
                      />
                      <span className={'count'}>{item.rating}</span>
                    </div>
                    {isVoting && voteItem === item.id ? (
                      <div className={'text-center'}>
                        <Spinner
                          as="span"
                          animation="border"
                          variant="danger"
                          size="xl"
                          role="status"
                        />
                      </div>
                    ) : (
                      <div
                        className={'vote_button'}
                        onClick={() => {
                          handleVote(item);
                        }}
                        onTouchStart={(e) => {
                          handleVote(item);
                        }}
                      >
                        {t('voting-board:item.vote')}
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>
            );
          })}
        </>
      ) : (
        <Container className="voting_container">
          <div className={'text-center'}>
            <Spinner
              as="span"
              animation="border"
              variant="danger"
              size="xl"
              role="status"
            />
          </div>
        </Container>
      )}

      <div className="voting__board__paginate">
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
    </>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(VotingBoard);
