// import PropType from 'prop-types';
// import { Link } from 'react-router-dom';

// const SinglePostCard = ({ post }) => {
//   // console.log(post);

//   return (
//     <div className='group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[350px] border-teal-500 hover:border-2 transition-all duration-300'>
//       <Link to={`/posts/${post.slug}`}>
//         <img
//           alt='recentpost'
//           src={`/uploads/` + post.postImage}
//           className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
//         />
//       </Link>
//       <div className='p-3 flex flex-col gap-2'>
//         <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
//         <span className='text-sm italic'>{post.category}</span>
//         <Link
//           to={`/posts/${post.slug}`}
//           className='z-10 absolute group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
//         >
//           Read Article
//         </Link>
//       </div>
//     </div>
//   );
// };

// SinglePostCard.propTypes = {
//   post: PropType.object.isRequired,
// };

// export default SinglePostCard;
