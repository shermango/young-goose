import React from 'react';
import Repository from './Repository';

const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarRepository
}) => {
  if (errors) {
    return (
      <div>
        <p>
          <strong>Issues from Organization:</strong>
          <a href={organization.url}>{organization.name}</a>
          {errors.map(err => err.message).join(' ')}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarRepository={onStarRepository}
      />
    </div>
  );
};

export default Organization;
