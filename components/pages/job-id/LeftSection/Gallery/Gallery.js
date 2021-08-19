import { Modal } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Carousel from 'react-multi-carousel';
import classNames from 'classnames';
import { useState } from 'react';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 5000, min: 992 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 992, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 576 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const Gallery = (props) => {
  const { listingItem, isMobile } = props;
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(3);
  const [modalGallery, setModalGallery] = useState(listingItem?.listingGallery);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const Forward = () => {
    if (listingItem.listingGallery.length - 1 <= maxIndex) {
      setMinIndex(0);
      setMaxIndex(3);
    } else {
      setMinIndex(minIndex + 1);
      setMaxIndex(maxIndex + 1);
    }
  };
  const Backward = () => {
    let maximum = listingItem.listingGallery.length - 1;
    if (minIndex <= 0 || maxIndex <= 3) {
      setMinIndex(maximum - 3);
      setMaxIndex(maximum);
    } else {
      setMinIndex(minIndex - 1);
      setMaxIndex(maxIndex - 1);
    }
  };
  const CustomDot = ({ index, onClick, active }) => {
    return (
      <>
        {index == 0 && listingItem.listingGallery.length > 4 ? (
          <>
            <a className="prev" onClick={Backward}>
              &#10094;
            </a>
            <a className="next" onClick={Forward}>
              &#10095;
            </a>
          </>
        ) : (
          ''
        )}
        {index >= minIndex && index <= maxIndex ? (
          <button
            onClick={(e) => {
              onClick();
              e.preventDefault();
            }}
            className={classNames('custom-dot', {
              'custom-dot--active': active,
            })}
          >
            <img
              src={
                listingItem.listingGallery[index]?.url
                  ? listingItem.listingGallery[index]?.url
                  : listingItem.listingGallery[index]?.preview
              }
              key={listingItem.listingGallery[index].id}
              className="item__image__dots"
              alt={`${listingItem.listingGallery[index].id}`}
            />
          </button>
        ) : (
          ''
        )}
      </>
    );
  };

  const OpenModal = (id) => {
    if (id) {
      let modalIndex = listingItem.listingGallery.findIndex(
        (item) => item.id === id
      );
      const upperList = listingItem.listingGallery.slice(modalIndex);
      const lowerList = listingItem.listingGallery.slice(0, modalIndex);

      const modalListingGallery = [...upperList, ...lowerList];
      setModalGallery(modalListingGallery);

      setShow(true);
    }
  };

  return (
    <div
      className={`right-section__information ${
        isMobile ? 'right-section__information--mobile' : ''
      }`}
    >
      <div className="information__cover">
        <Carousel
          arrows={true}
          dragable={true}
          infinite={true}
          centerMode={false}
          responsive={responsive}
          containerClass=" carousel-with-custom-dots"
          itemClass="cover__item"
          renderDotsOutside
          dotListClass="react-multi-carousel-list"
          showDots
          customDot={<CustomDot />}
        >
          {listingItem?.listingGallery?.length > 0 ? (
            listingItem?.listingGallery?.map((item) => (
              <img
                src={item?.url ? item.url : item.preview}
                key={item.id}
                className="item__image"
                onClick={() => OpenModal(item.id)}
                alt={`${item?.id}`}
              />
            ))
          ) : (
            <></>
          )}
        </Carousel>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className="carousel__modal"
        centered
        size={'xl'}
      >
        <ModalHeader
          bsPrefix="custom"
          closeButton
          className="modalHeader"
        ></ModalHeader>
        <Modal.Body>
          <div className="information__cover">
            <Carousel
              arrows={true}
              dragable={true}
              infinite={true}
              centerMode={false}
              responsive={responsive}
              containerClass=" carousel-with-custom-dots"
              itemClass="cover__item"
            >
              {modalGallery?.length > 0 ? (
                modalGallery.map((item) => (
                  <img src={item.url} key={item.id} className="item__image" />
                ))
              ) : (
                <></>
              )}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
