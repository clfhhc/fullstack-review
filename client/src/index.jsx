import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const repoUrl = "http://localhost:1128/repos";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      data: null
    }
    
    this.getRepos = this.getRepos.bind(this);
    this.getReposAuto = () => {
      this.getRepos();
      setTimeout(this.getReposAuto, 5000);
    }
  }

  componentDidMount(){
    // this.getReposAuto();
    
  }

  search (term) {
    // TODO
    $.ajax({
      url: repoUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({search: term}),
      success: function(data) {
        console.log(`${term} was searched`);
      },
      error: function(error) {
        console.log('POST error: ', error);
      }
    })
  }

  getRepos (){
    $.ajax({
      url: repoUrl,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log('fetched')
        this.setState({repos: data});
      }.bind(this),
      error:  function(error) {
        console.log('GET error: ', error);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));