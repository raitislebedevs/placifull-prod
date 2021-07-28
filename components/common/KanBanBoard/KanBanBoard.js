import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { FaGraduationCap } from 'react-icons/fa';
import { RiBuildingLine, RiBuilding3Line } from 'react-icons/ri';
import {
  IoLocationOutline,
  IoGlobeOutline,
  IoMedalOutline,
  IoBookOutline,
} from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
import { VacancyListingService } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { ApplicantItem, KanbanColumn } from '../index';
import { formatDate, formatNumber } from 'utils/standaloneFunctions';

const KanBanBoard = (props) => {
  const { t, id, kanBanItems, setKanBanItems, companyLogo, kanBanListing } =
    props;

  const [optionOpened, setOptionOpened] = useState('');
  const [applied, setApplied] = useState(0);
  const [reviewd, setReviewd] = useState(0);
  const [interview, setInterview] = useState(0);
  const [hired, setHired] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [pending, setPending] = useState(0);
  const [savingBoard, setSavingBoard] = useState(false);

  const initialColumns = [
    {
      columnId: 'applicants',
      title: t('kanban:kanban.columns.applicants'),
      background: '#FFF2E5',
      borderColor: '#FFCA99',
      countColor: '#FF9D42',
    },
    {
      columnId: 'reviewed',
      title: t('kanban:kanban.columns.reviewed'),
      background: '#FEF9E6',
      borderColor: '#F9C50B',
      countColor: '#FDE79B',
    },
    {
      columnId: 'shortlisted',
      title: t('kanban:kanban.columns.shortlisted'),
      background: '#F1E5FF',
      borderColor: '#A761FF',
      countColor: '#C699FF',
    },
    {
      columnId: 'interviewed',
      title: t('kanban:kanban.columns.interviewed'),
      background: '#E5F2FF',
      borderColor: '#42A0FF',
      countColor: '#99CCFF',
    },
    {
      columnId: 'pending',
      title: t('kanban:kanban.columns.pending'),
      background: '#FFE7E5',
      borderColor: '#FF5147',
      countColor: '#FF9E99',
    },
    {
      columnId: 'accepted',
      title: t('kanban:kanban.columns.accepted'),
      background: '#EAFBF2',
      borderColor: '#25C06D',
      countColor: '#A9EEC9',
    },
  ];

  const [columns, setColumns] = useState([]);

  const onDragEnd = (dragItem) => {
    let allKanBanItems = [...kanBanItems];
    let changedItem = kanBanItems.filter(
      (item) => item?._id === dragItem?.draggableId
    )[0];

    allKanBanItems.splice(kanBanItems.indexOf(changedItem), 1);
    allKanBanItems.forEach((item) => {
      if (
        item?.column === dragItem?.source?.droppableId &&
        item?.index >= dragItem?.source?.index
      ) {
        item.index--;
      }
      if (
        item?.column === dragItem?.destination?.droppableId &&
        item?.index >= dragItem?.destination?.index
      ) {
        item.index++;
      }
    });

    changedItem.column = dragItem?.destination?.droppableId;
    changedItem.index = dragItem?.destination?.index;
    allKanBanItems.push(changedItem);

    allKanBanItems.sort((a, b) => (a.index > b.index ? 1 : -1));

    getApplicantCount(allKanBanItems);

    setKanBanItems(allKanBanItems);
  };

  const updateKanBanBoard = async () => {
    setSavingBoard(true);
    try {
      let payload = {
        KanBanColumns: [...columns],
        Applicants: [...kanBanItems],
      };
      if (kanBanItems) {
        await VacancyListingService.UPDATE(id, payload);
        TostifyCustomContainer('success', 'Board Updated');
      }
      setSavingBoard(false);
    } catch (error) {
      TostifyCustomContainer('error', error);
    }
    setSavingBoard(false);
  };

  const getColumnCount = (column) => {
    switch (column) {
      case 'applicants':
        return applied;
      case 'reviewed':
        return reviewd;
      case 'interviewed':
        return interview;
      case 'accepted':
        return hired;
      case 'shortlisted':
        return shortlisted;
      case 'pending':
        return pending;
      default:
        return (result = 0);
    }
  };

  const getApplicantCount = (items) => {
    setApplied(
      items.reduce((p, c) => (c.column == 'applicants' ? (p = p + 1) : p), 0)
    );
    setReviewd(
      items.reduce((p, c) => (c.column == 'reviewed' ? (p = p + 1) : p), 0)
    );
    setInterview(
      items.reduce((p, c) => (c.column == 'interviewed' ? (p = p + 1) : p), 0)
    );
    setHired(
      items.reduce((p, c) => (c.column == 'accepted' ? (p = p + 1) : p), 0)
    );
    setShortlisted(
      items.reduce((p, c) => (c.column == 'shortlisted' ? (p = p + 1) : p), 0)
    );
    setPending(
      items.reduce((p, c) => (c.column == 'pending' ? (p = p + 1) : p), 0)
    );
  };

  const addColumn = () => {
    let options = initialColumns.filter(
      (item) => !columns.find((el) => item.columnId === el.columnId)
    );
    options[0].title = t('kanban:kanban.columns.column-name');
    setColumns([...columns, options[0]]);
  };

  useEffect(() => {
    getApplicantCount(kanBanItems);
    if (kanBanListing?.KanBanColumns.length != 0)
      return setColumns(kanBanListing?.KanBanColumns);

    setColumns(initialColumns);
  }, []);

  return (
    <div className="job__modal__conatainer modal-fullscreen">
      <div className={'applicant__container '}>
        <Row className={'applicants__info__container'}>
          <Col lg={5} sm={12} xs={12}>
            <Row className={'job__main__info'}>
              <Col
                lg={5}
                sm={12}
                xs={12}
                className={'vacancy__logo__container'}
              >
                <img
                  src={companyLogo}
                  id="logo"
                  alt="Placifull"
                  className={'vacancy__logo'}
                />
              </Col>
              <Col lg={7} sm={12} xs={12}>
                <div className={'job__name'}>
                  {kanBanListing?.positionHeader}
                </div>
                <div className={'job__location'}>
                  <IoLocationOutline className={'job__icon'} />
                  {kanBanListing?.officeAddress}
                </div>
                <div className={'job__company'}>
                  <RiBuildingLine className={'job__icon'} />{' '}
                  {kanBanListing?.companyName}
                </div>

                {kanBanListing?.hourlySalaryFrom ? (
                  <div className={'job__salary'}>
                    {`${kanBanListing?.currency?.symbol} ${formatNumber(
                      kanBanListing.hourlySalaryFrom
                    )}- ${formatNumber(kanBanListing.hourlySalaryTo)}`}{' '}
                    <em>{t('kanban:kanban.salary.hour')}</em>{' '}
                  </div>
                ) : (
                  ''
                )}
                {kanBanListing?.monthlySalaryFrom ? (
                  <div className={'job__salary'}>
                    {`${kanBanListing?.currency?.symbol} ${formatNumber(
                      kanBanListing.monthlySalaryFrom
                    )}- ${formatNumber(kanBanListing.monthlySalaryTo)}`}{' '}
                    <em>{t('kanban:kanban.salary.month')}</em>{' '}
                  </div>
                ) : (
                  ''
                )}

                {kanBanListing?.annualSalaryFrom ? (
                  <div className={'job__salary'}>
                    {`${kanBanListing?.currency?.symbol} ${formatNumber(
                      kanBanListing.annualSalaryFrom
                    )}- ${formatNumber(kanBanListing.annualSalaryTo)}`}{' '}
                    <em>{t('kanban:kanban.salary.year')}</em>{' '}
                  </div>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
          <Col lg={7} sm={12} xs={12}>
            <Row>
              <Col className={'job__overview__heading'} lg={12} sm={12} xs={12}>
                {t('kanban:kanban.job-overview.title')}
              </Col>
            </Row>
            <Row className={'job__overview__container'}>
              <Col
                lg={5}
                sm={12}
                xs={12}
                className={'job__overview__item__container'}
              >
                <Row>
                  <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                    <RiBuilding3Line className={'job__icon'} />
                  </Col>
                  <Col lg={10} sm={10} xs={10} className={'item__info'}>
                    <div>
                      <em> {t('kanban:kanban.job-overview.industry')}</em>
                    </div>
                    <div>
                      {t(
                        `job-common:work-area.options.${kanBanListing?.vacancyOption}`
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={5}
                sm={12}
                xs={12}
                className={'job__overview__item__container'}
              >
                <Row>
                  <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                    <IoMedalOutline className={'job__icon'} />
                  </Col>
                  <Col lg={10} sm={10} xs={10} className={'item__info'}>
                    <div>
                      <em>{t('kanban:kanban.job-overview.contract-type')}</em>
                    </div>
                    <div>
                      {t(
                        `job-common:contract-type.options.${kanBanListing?.contractType}`
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
              {kanBanListing?.enLanguages ? (
                <Col
                  lg={5}
                  sm={12}
                  xs={12}
                  className={'job__overview__item__container'}
                >
                  <Row>
                    <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                      <IoGlobeOutline className={'job__icon'} />
                    </Col>
                    <Col lg={10} sm={10} xs={10} className={'item__info'}>
                      <div>
                        <em>{t('kanban:kanban.job-overview.languages-en')}</em>
                      </div>
                      {kanBanListing?.enLanguages.map((item) => {
                        return <div> {item}</div>;
                      })}
                    </Col>
                  </Row>
                </Col>
              ) : (
                <> </>
              )}
              {kanBanListing?.nativeLanguages ? (
                <Col
                  lg={5}
                  sm={12}
                  xs={12}
                  className={'job__overview__item__container'}
                >
                  <Row>
                    <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                      <IoGlobeOutline className={'job__icon'} />
                    </Col>
                    <Col lg={10} sm={10} xs={10} className={'item__info'}>
                      <div>
                        <em>{t('kanban:kanban.job-overview.native')}</em>
                      </div>
                      {kanBanListing?.nativeLanguages.map((item) => {
                        return <div> {item}</div>;
                      })}
                    </Col>
                  </Row>
                </Col>
              ) : (
                <> </>
              )}

              <Col
                lg={5}
                sm={12}
                xs={12}
                className={'job__overview__item__container'}
              >
                <Row>
                  <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                    <FaGraduationCap className={'job__icon'} />
                  </Col>
                  <Col lg={10} sm={10} xs={10} className={'item__info'}>
                    <div>
                      <em>{t('kanban:kanban.job-overview.working-time')}</em>
                    </div>
                    <div>
                      {t(
                        `job-common:working-time.options.${kanBanListing?.workingTime}`
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={5}
                sm={12}
                xs={12}
                className={'job__overview__item__container'}
              >
                <Row>
                  <Col lg={2} sm={2} xs={2} className={'item__icon'}>
                    <IoBookOutline className={'job__icon'} />
                  </Col>
                  <Col lg={10} sm={10} xs={10} className={'item__info'}>
                    <div>
                      <em>{t('kanban:kanban.job-overview.expiry-date')}</em>
                    </div>
                    <div> {formatDate(kanBanListing?.expiryDate, t)}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="kanban__options">
          <Col lg={2} sm={12} xs={12} className="kanban__save">
            {savingBoard ? (
              <Button disabled={savingBoard} className="btn btn-primary btn-sm">
                {t('kanban:kanban.saving')}
              </Button>
            ) : (
              <Button
                className="btn btn-primary btn-sm"
                onClick={() => updateKanBanBoard()}
              >
                {t('kanban:kanban.save')}
              </Button>
            )}
          </Col>
        </Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row className={'applicants__container'}>
            {columns?.map((row, index) => {
              return (
                <KanbanColumn
                  t={t}
                  id={row.columnId}
                  title={row.title}
                  columns={columns}
                  key={row.columnId}
                  setColumns={setColumns}
                  background={row.background}
                  countColor={row.countColor}
                  optionOpened={optionOpened}
                  columnCount={columns.length}
                  borderColor={row.borderColor}
                  setOptionOpened={setOptionOpened}
                  count={getColumnCount(row.columnId)}
                >
                  {kanBanItems?.map((item) => {
                    if (item.column === row.columnId) {
                      return (
                        <ApplicantItem
                          t={t}
                          id={item?.id}
                          key={item?.id}
                          cv={item?.cv.id}
                          email={item?.email}
                          index={item?.index}
                          name={item?.fullName}
                          phone={item?.phoneNumber}
                          kanBanItems={kanBanItems}
                          optionOpened={optionOpened}
                          salary={item?.proposedSalary}
                          setKanBanItems={setKanBanItems}
                          setOptionOpened={setOptionOpened}
                        />
                      );
                    }
                  })}
                </KanbanColumn>
              );
            })}
            {columns.length < 6 && (
              <Col className={'add_button'} lg={2} sm={12} xs={12}>
                <IoMdAddCircle onClick={() => addColumn()} />
              </Col>
            )}
          </Row>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanBanBoard;
