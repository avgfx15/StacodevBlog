import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevData) => ({
        ...prevData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const getPostBySearchQuery = async () => {
      const searchQuery = urlParams.toString();

      const response = await fetch(`/api/posts/getallposts?${searchQuery}`);

      if (!response.ok) {
        console.log('no response');
        return;
      }
      const data = await response.json();
      setSearchResult(data.AllPost);
    };

    getPostBySearchQuery();
  }, [location.search]);

  const handleChange = async (e) => {
    if (e.target.id === 'searchText') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);

    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

    setSidebarData({ searchTerm: '', sort: 'desc', category: 'uncategorized' });
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-5 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <div className='flex items-center gap-3'>
            <label
              id='searchTermLabel'
              htmlFor='searchTerm'
              className='font-semibold whitespace-nowrap'
            >
              Search Term
            </label>
            <TextInput
              type='text'
              placeholder='Search Term'
              id='searchText'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <label
              id='sortLabel'
              htmlFor='sort'
              className='font-semibold whitespace-nowrap'
            >
              Sort
            </label>
            <Select
              onChange={handleChange}
              defaultValue={sidebarData.sort}
              id='sort'
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-3'>
            <label
              id='categorylabel'
              htmlFor='category'
              className='font-semibold whitespace-nowrap'
            >
              Category
            </label>
            <Select
              defaultValue={sidebarData.category}
              onChange={handleChange}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React Js</option>
              <option value='nodejs'>Node Js</option>
              <option value='javascript'>Javascript</option>
            </Select>
          </div>
          <div className='flex items-center gap-3'>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Search Result
            </Button>
          </div>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Post Results
        </h1>
        <div className='p-5 flex flex-wrap gap-3'>
          {!searchResult.length && <p>No search result</p>}
          {Array.isArray(searchResult) &&
            searchResult.map((post) => (
              <div key={post._id} className=''>
                <div className='group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[350px] border-teal-500 hover:border-2 transition-all duration-300'>
                  <Link to={`/posts/${post.slug}`}>
                    <img
                      alt='recentpost'
                      src={`/uploads/` + post.postImage}
                      className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                    />
                  </Link>
                  <div className='p-3 flex flex-col gap-2'>
                    <p className='text-lg font-semibold line-clamp-2'>
                      {post.title}
                    </p>
                    <span className='text-sm italic'>{post.category}</span>
                    <Link
                      to={`/posts/${post.slug}`}
                      className='z-10 absolute group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
