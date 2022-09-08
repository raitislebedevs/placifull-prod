import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';
import { formatDate } from 'utils/standaloneFunctions';
import styles from '../../../styles/components/common/BlogItem.module.scss';

function BlogItem(props) {
  const { t, item } = props;
  return (
    <div className={'blog__item'}>
      <div>
        <div className={'blog__image__container'}>
          <img
            src={item?.gallery?.url}
            className="blog__image"
            alt="Company Logo"
          />
        </div>
      </div>
      <div className={'header__container'}>
        <h1 className={'blog__header'}>{item?.header}</h1>
      </div>
      <div className={'paragraph__container'}>
        <p className={'blog__paragraph'}>
          {item?.blogInformationText?.substring(0, 275)}
          <span>{` [...]`}</span>
        </p>
      </div>
      <div className={'info__container'}>
        <span className={'blog__creation__date'}>
          <AiOutlineFieldTime className={'blog__icon'} />
          {formatDate(item.insertDate, t)}
        </span>
        <span className={'blog__author'}>
          <BsPerson className={'blog__icon'} /> {item?.author}
        </span>
      </div>
      <div className={'footer__container'}>
        <Link href={`/blog/${item?.id}`}>
          <span className={'blog__button'} onClick={''}>
            {t('blog:blog-item.button')}
          </span>
        </Link>
        <span className={'blog__viewed'}>
          <AiOutlineEye /> ({item?.popularity?.views})
        </span>
      </div>
    </div>
  );
}

export default BlogItem;
