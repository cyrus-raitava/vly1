import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PersonListItem.css';

function PersonListItem(props) {
  return (
    <div className={styles['single-person']}>
      <h3>
        <Link to={`/people/${props.person.cuid}`} >
          {props.person.name}
        </Link>
      </h3>
      <p className={styles['person-email']}><FormattedMessage id="personEmail" /> {props.person.email}</p>
      <ul>{
        props.person.role.map(role => (
          <li key={role}>{role}</li>
        ))
      }</ul>
    </div>
  );
}

PersonListItem.propTypes = {
  person: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    moniker: PropTypes.string,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.any,
    role: PropTypes.arrayOf(PropTypes.oneOf(['admin', 'op-provider', 'volunteer', 'content-provider', 'tester'])),
    status: PropTypes.oneOf(['active', 'inactive', 'hold']),
  }).isRequired,
  // npm onDelete: PropTypes.func.isRequired,
};

export default PersonListItem;
