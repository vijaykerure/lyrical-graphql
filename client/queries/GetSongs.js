import { gql } from '@apollo/client';

const queryGetSongs = gql`
  query Songs {
    songs {
      id,
      title
    }
  }
`;

export default queryGetSongs;
