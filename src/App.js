import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 50,
  border: "1px solid green",
  margin: 6,
  padding: 8
};



class App extends Component{

  constructor(){

    super();
    this.state = {
      apiURL : "https://api.themoviedb.org/3/movie/top_rated?api_key={f2285e99f3f95c5aa26de6a5cbbd72f2}&language=pt-BR&page=",
      page : 1,
      items: [],
      total_pages : ""
    };

  }

  componentDidMount(){
    this.getMovies();
  }


  getMovies = () => {

    fetch(this.state.apiURL + this.state.page)
    .then(response => response.json())
    .then(data => {
        this.setState({
          items : this.state.items.concat(data.results),
          total_pages : data.total_pages
        })
        console.log(data)
    })
    .catch(error => {
        console.log(error);
    })

  }

  fetchMoreData = () => {
    // 20 more records in 1.5 secs
    setTimeout(() => {

      if(this.state.page < this.state.total_pages){
        this.setState({
          page : this.state.page + 1
        });
      }
      console.log(this.state.page)

      this.getMovies();

    }, 1500);

  };

  render(){
    return(
      <>
        <h1>Infinity Scroll</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Carregando...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              {i.title} - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </>
    )
  }

}

export default App;
