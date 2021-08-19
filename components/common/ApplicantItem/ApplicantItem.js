import { Draggable } from 'react-beautiful-dnd';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { CurriculumVitaesService } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { useState } from 'react';
import { CurriculamVitaes } from '../index';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#F8F8F8' : 'white',
  ...draggableStyle,
});

const ApplicantItem = (props) => {
  const {
    t,
    id,
    cv,
    name,
    phone,
    email,
    salary,
    index,
    kanBanItems,
    optionOpened,
    setKanBanItems,
    setOptionOpened,
  } = props;
  const [applicantCv, setApplicantCv] = useState({});
  const [showCv, setShowCv] = useState(false);

  const handleOption = (id) => {
    if (optionOpened === id) return setOptionOpened('');

    setOptionOpened(id);
  };

  const getUserCV = async (id) => {
    try {
      const { data, error } = await CurriculumVitaesService.GET(id);
      if (data) {
        setApplicantCv(data);
      }
      setShowCv(true);
    } catch (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.no-cv')
      );
    }
  };

  const removeUser = async (id) => {
    let updatedKanBanList = kanBanItems.filter((item) => item.email != email);
    setKanBanItems(updatedKanBanList);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            className={'column__item'}
          >
            <div className={'item__header'}>
              <span className={'applicant__name'}>{name}</span>
              <span className={'item__option_container'}>
                <div
                  className={'item__option'}
                  onClick={() => handleOption(id)}
                >
                  . . .
                </div>
                {optionOpened === id && (
                  <div className={'options'}>
                    <div onClick={() => getUserCV(cv)} className={'cv'}>
                      {t('kanban:kanban.view-cv')}
                    </div>
                    <div onClick={() => removeUser(id)} className={'remove'}>
                      {t('kanban:kanban.remove')}
                    </div>
                  </div>
                )}
              </span>
            </div>
            <div className={'item__body__container'}>
              <div className={'body__item'}>
                <AiOutlineMail className={'body__job__icon'} /> {email}
              </div>
              <div className={'body__item'}>
                <AiOutlinePhone className={'body__job__icon'} /> {phone}
              </div>
              <div className={'body__item'}>
                <FaRegMoneyBillAlt className={'body__job__icon'} /> {salary}
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      <CurriculamVitaes
        curriculamVitaes={applicantCv}
        show={showCv}
        setShowCv={setShowCv}
        onHide={() => setShowCv(false)}
      />
    </>
  );
};
export default ApplicantItem;
