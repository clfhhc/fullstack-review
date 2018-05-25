import React from 'react';

const headers = ['Repo', 'Owner'];


const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.<br/>
    {props.repos.lenght || (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (<th key={header}>{header}</th>))}
          </tr>
        </thead>
        <tbody>
          {props.repos.map((repo) => (
            <tr key={repo.repoId}>
              <td><a href={repo.repoHtmlUrl}>{repo.repoName}</a></td>
              <td><a href={repo.ownerHtmlUrl}>{repo.ownerName}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)

export default RepoList;