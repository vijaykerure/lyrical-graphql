import React, { useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import queryGetSongs from '../queries/GetSongs';

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!){
    deleteSong(id: $id) {
      id
    }
  }
`

const renderItems = (songs, deleteSong, dLoading) => {
  return songs.map(({ id, title }) => (
    <li key={id} className="collection-item">
      <Link to={'/songs/' + id}>{title}</Link>
      <div className='action-box'>
        <Link to={'/songs/edit/' + id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons"
          onClick={() => !dLoading && deleteSong({ variables: { id } })}
          style={{ cursor: dLoading ? 'not-allowed' : 'pointer' }}
        >
          delete
        </i>
      </div>
    </li>
  ));
}

export default function Songs() {

  const { loading, error, data } = useQuery(queryGetSongs);
  const [deleteSong, { loading: dLoading, error: mError }] = useMutation(DELETE_SONG, { refetchQueries: [{ query: queryGetSongs }] });

  useEffect(() => {
    if (mError) {
      M.toast({ html: 'Song deletion failed.' })
    }
  }, [mError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h4>Songs</h4></li>
        {data && data.songs && renderItems(data.songs, deleteSong, dLoading)}
      </ul>

      <div className="fixed-action-btn">
        <Link to='songs/new' className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}
