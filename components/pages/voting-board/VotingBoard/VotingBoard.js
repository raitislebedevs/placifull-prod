import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';
import { VotingBoardService } from 'services';

const VotingBoard = (props) => {
  const { t } = props;
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(45);
  const [votingItems, setVotingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votingOption, setVotingOption] = useState('');
  const [voteItem, setVoteItem] = useState('');

  const handleRating = async (rate, votingItem) => {
    setVoteItem(votingItem.id);
    setIsRating(true);
    try {
      const rating = votingItem?.rating || 0;
      const totalRaters = votingItem?.totalRaters || 0;

      let newRate =
        parseFloat(
          ((rate + rating * totalRaters) / (totalRaters + 1)).toFixed(1)
        ) || rate;

      let payload = {
        rating: newRate,
        totalRaters: totalRaters + 1,
      };

      await VotingBoardService.UPDATE(votingItem.id, payload);

      getUserSuggestions();
    } catch (error) {
      setIsRating(false);
    }
    setIsRating(false);
  };

  const handleVote = async (votingItem) => {
    if (votingItem.id !== voteItem) return;
    setIsVoting(true);
    try {
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

      let payload = {
        endVotes: votes,
      };

      await VotingBoardService.UPDATE(votingItem.id, payload);

      getUserSuggestions();
    } catch (error) {
      console.log(error);
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

  const handleChoosenOption = (option, item) => {
    setVotingOption(option);
    setVoteItem(item.id);
  };

  return (
    <>
      {!isLoading == true ? (
        <>
          {votingItems?.map((item) => {
            return (
              <Container className="voting_container">
                <Row key={item.id}>
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
                            onClick={() => handleChoosenOption('up', item)}
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
                            onClick={() => handleChoosenOption('down', item)}
                          />{' '}
                          {t('voting-board:item.down')}
                        </span>
                      </div>
                    </div>
                    <div className={'rating_container'}>
                      <h6 className={'rating'}>
                        {t('voting-board:item.rating')}
                      </h6>
                      {isRating && voteItem === item.id ? (
                        <div className={'text-center voting__ratings'}>
                          <Spinner
                            as="span"
                            animation="border"
                            variant="danger"
                            size="xl"
                            role="status"
                          />
                        </div>
                      ) : (
                        <>
                          <Rating
                            stop={5}
                            fractions={4}
                            initialRating={item.rating}
                            onChange={(e) => {
                              handleRating(e, item);
                            }}
                            className="voting__ratings"
                            fullSymbol={<FaStar className="ratings__icon" />}
                            emptySymbol={
                              <FaRegStar className="ratings__icon" />
                            }
                          />
                          <span className={'count'}>{item.rating}</span>
                        </>
                      )}
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

export default VotingBoard;
