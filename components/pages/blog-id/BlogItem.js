import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { MdPhotoCamera } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { formatDate } from 'utils/standaloneFunctions';
import { Markup } from 'interweave';

const BlogItem = (props) => {
  const { blogItem, t } = props;

  return (
    <Row>
      <Col lg={12} md={12} sm={12} xs={12}>
        <div className={'info__container'}>
          <span className={'blog__creation__date'}>
            <AiOutlineFieldTime className={'blog__icon'} />{' '}
            {formatDate(blogItem.insertDate, t)}
          </span>
          <span className={'blog__author'}>
            <BsPerson className={'blog__icon'} /> {blogItem?.author}
          </span>
        </div>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}>
        <div className={'blog__image__container'}>
          <img
            src={blogItem?.gallery?.url}
            className="blog__image"
            alt="Blog Item visual"
          />
        </div>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}>
        <span className={'photograph__author'}>
          <MdPhotoCamera className={'blog__icon photography'} />{' '}
          {blogItem?.photograph}
        </span>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}>
        <div className={'description'}>
          <Markup content={blogItem?.blogInformation} />
        </div>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}></Col>
    </Row>
  );
};

export default BlogItem;
