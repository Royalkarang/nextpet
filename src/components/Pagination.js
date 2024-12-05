import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="influ-pagi">
      <ul>
        <li>
          <a
            href="#!"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          >
            <MdArrowBackIosNew />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <a href="#!" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#!"
            onClick={() =>
              paginate(
                currentPage < pageNumbers.length
                  ? currentPage + 1
                  : pageNumbers.length
              )
            }
          >
            <MdArrowForwardIos />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
