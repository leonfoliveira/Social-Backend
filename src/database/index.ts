import Knex from 'knex';
import knexfile from '../../knexfile';

const initialize = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return Knex(knexfile.test);
    case 'production':
      return Knex(knexfile.production);
    case 'development':
    default:
      return Knex(knexfile.development);
  }
};

export default initialize();
