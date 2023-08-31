import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

function News(props) {
    const [articles, setArticles]         = useState([]);
    const [loading, setLoading]           = useState(false);
    const [page, setPage]                 = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const[category, setCategory]          = useState(props.category);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=20`;
            const response = await fetch(url);
            const parsedData = await response.json();
            setLoading(false);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        }
        fetchData();
    }, [page,category]);

    const handlePrevClick = async () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = async () => {
        if (page < Math.ceil(totalResults / 20)) {
            setPage(page + 1);
        }
    };

    return (
        <div className="container my-3">
            <h1>NewsDeck - Top Headlines</h1>
            {loading && <Spinner/>}
            <div className="row">
                {!loading && articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                        <NewsItem
                            title={element.title ? element.title : ''}
                            description={element.description ? element.description : ''}
                            imageUrl={element.urlToImage ? element.urlToImage : "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/newscms/2019_01/2705191/nbc-social-default.png"}
                            newsUrl={element.url}
                        />
                    </div>
                ))}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>
                    &larr; Previous
                </button>
                <button
                    disabled={page >= Math.ceil(totalResults / 20)}
                    type="button"
                    className="btn btn-dark"
                    onClick={handleNextClick}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}

export default News;
