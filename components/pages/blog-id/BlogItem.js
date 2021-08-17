import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineEye } from 'react-icons/ai';
import { formatDate } from 'utils/standaloneFunctions';
import { Markup } from 'interweave';
import usePopularity from 'hooks/usePopularity';
import { BlogService } from 'services';

const BlogItem = (props) => {
  const { blogItem, t } = props;
  const [liveViews, starValue, isLoading, handleRating] = usePopularity(
    blogItem,
    BlogService
  );

  return (
    <Row>
      <Col lg={12} md={12} sm={12} xs={12}>
        <div className={'info__container'}>
          <span className={'blog__creation__date'}>
            {' '}
            <AiOutlineFieldTime className={'blog__icon'} />{' '}
            {formatDate(blogItem.insertDate, t)}
          </span>
          <span className={'blog__author'}>
            <BsPerson className={'blog__icon'} /> {blogItem.author}
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
        <div className={'description'}>
          <Markup content={blogItem?.blogInformation} />
        </div>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}></Col>
    </Row>
  );
};

export default BlogItem;