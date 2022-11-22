import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/everything?q=india&from=2022-10-22&sortBy=publishedAt&apiKey=2f89839a4f1146bcbc7948a04ff09978&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseadata = await data.json();
        this.setState({ articles: parseadata.articles, totalResults: parseadata.totalResults });

    }

    handlePreclick = async () => {
        let url = `https://newsapi.org/v2/everything?q=india&from=2022-10-22&sortBy=publishedAt&apiKey=2f89839a4f1146bcbc7948a04ff09978&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseadata = await data.json();
        // this.setState({ articles: parseadata.articles });
        this.setState({
            page: this.state.page - 1,
            articles: parseadata.articles
        })
    }
    handleNextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/everything?q=india&from=2022-10-22&sortBy=publishedAt&apiKey=2f89839a4f1146bcbc7948a04ff09978&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parseadata = await data.json();
            // this.setState({ articles: parseadata.articles });
            this.setState({
                page: this.state.page + 1,
                articles: parseadata.articles
            })
        }

    }
    render() {

        return (
            <>
                <div className="container">
                    <h3 className="text-center">Top Headlines</h3>
                    <div className="row">
                        {this.state.articles.map((elements) => {
                            console.log(elements);
                            return <div className="col-md-4" key={elements.url} >
                                <NewsItem title={elements.title} description={elements.description} imageurl={elements.urlToImage} newsUrl={elements.url} /></div>
                        })}

                    </div>
                    <div className="container mb-5">
                        <div className="d-flex justify-content-between">
                            <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePreclick}>&larr; Prev</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextclick}>Next &rarr;</button>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}

export default News
