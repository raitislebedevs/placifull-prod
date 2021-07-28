import { Button, Row, Col } from 'react-bootstrap';
import {
  Header,
  RightSection,
  LeftSection,
} from 'components/pages/transport-id';
import Head from 'next/head';
import Modal from 'react-bootstrap/Modal';

const Preview = (props) => {
  const { t, previewModal, setPreviewModal, previewItem } = props;

  const PreviewModal = (props) => {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        t={t}
        keyboard={false}
        dialogClassName="custom__preview_modal"
      >
        <div className="transport-detail-container main-container">
          <Head>
            <title>{previewItem?.name}</title>
          </Head>
          <div className={'preview__modal'}>
            <Header listingItem={previewItem} t={t} />
            <Row>
              <Col lg={8}>
                <LeftSection listingItem={previewItem} t={t} />
              </Col>
              <Col lg={4}>
                <RightSection listingItem={previewItem} t={t} />
              </Col>
            </Row>
          </div>
        </div>
        <Modal.Footer>
          <Button onClick={props.onHide}>{t('common:preview-close')}</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <PreviewModal show={previewModal} onHide={() => setPreviewModal(false)} />
  );
};

export default Preview;
