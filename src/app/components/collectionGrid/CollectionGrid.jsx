import Image from "next/image";
import Link from "next/link";

const CollectionGrid = ({ showData }) => {
  return (
    <div className="moviesGrid">
      {showData.map((movie) => {
        let year = movie.release_date.substring(0, 4);
        let month = movie.release_date.substring(5, 7);
        let date = movie.release_date.substring(8, 10);
        let realeaseDate = `${date}-${month}-${year}`;
        let vote_average = Math.floor(movie.vote_average * 10);

        return (
          <div key={Math.random()} className="singleMovieCard">
            <Link href={`/movie/${movie.id}`}>
              <div className="imgWrapper">
                <Image
                  priority
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  width={150}
                  height={225}
                  alt={movie.title}
                />
                <span
                  className={
                    vote_average > 70
                      ? `voteAverage green`
                      : `voteAverage yellow`
                  }
                >
                  {vote_average}%
                </span>
              </div>
              <div className="singleMovieCard_content">
                <h4>{movie.title}</h4>
                <p>{realeaseDate}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionGrid;
