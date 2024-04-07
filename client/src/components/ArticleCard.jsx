import propTypes from "prop-types";

const ArticleCard = ({ image, title, target }) => {
  return (
    <>
      <article>
        <a href={target} target="_blank">
          <img
            src={image}
            className="mb-5 w-full max-w-full rounded-lg"
            alt="Image 1"
          />
        </a>
        <h2 className="mb-2 text-xl font-bold leading-tight  text-white">
          <a href={target} target="_blank">
            {title}
          </a>
        </h2>
        <a
          href="#"
          className="inline-flex items-center font-medium underline underline-offset-4  text-primary-500 hover:no-underline"
        >
          Read more
        </a>
      </article>
    </>
  );
};

ArticleCard.propTypes = {
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  target: propTypes.string.isRequired,
};

export default ArticleCard;
