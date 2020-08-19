import React, { useEffect, useState } from "react";
import "./style.css";
import API from '../../utils/API.js';

function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        loadArticles()
    }, [])

    const loadArticles = () => {
        API.articles()
            .then(res => {
                setArticles(res.data.articles)
                console.log(res.data.articles)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                {
                    articles.map((article, a) => (
                        <div key={a}>

                            <div className="card text-center">
                                <div className="card-header">
                                    {article.title}
                                </div>
                                <img src={article.urlToImage} alt={article.title} className="artImg" />
                                <div className="card-body">
                                    <h5 className="card-title">{article.author}</h5>
                                    <p className="card-text">{article.content}</p>
                                    <a href={article.url} className="btn btn-primary">Click to Read</a>
                                </div>
                                <div className="card-footer text-muted">
                                    {article.publishedAt}
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Articles;

