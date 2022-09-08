import { useState } from 'react';
import { useEffect } from 'react';
import { BlogService } from 'services';

const useBlogPosts = (activeItem, limit, language, skip) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, [activeItem, limit, language, skip]);

  const getBlogPosts = async () => {
    try {
      setIsLoading(true);

      let filter = {};
      if (!language && activeItem.filter) {
        filter = {
          blogType_contains: activeItem.filter,
        };
      }

      if (language && activeItem.filter) {
        filter = {
          blogType_contains: activeItem.filter,
          language_contains: language || null,
        };
      }

      if (language && !activeItem.filter) {
        filter = {
          language_contains: language || null,
        };
      }

      const result = await BlogService.FIND({
        _limit: limit,
        _start: skip,
        _where: filter,
        _sort: 'insertDate:desc',
      });

      const count = await BlogService.COUNT({
        _where: filter,
      });

      setTotal(count.data || 9);
      setItems(result.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return [isLoading, total, items];
};

export default useBlogPosts;
