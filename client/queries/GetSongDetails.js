import { gql } from '@apollo/client';

const queryGetSongDetails = gql`
  query Song($id: ID!){
    song(id: $id) {
      id,
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default queryGetSongDetails;
