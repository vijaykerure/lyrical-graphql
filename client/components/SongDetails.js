import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import queryGetSongDetails from '../queries/GetSongDetails';
import Lyrics from './Lyrics';

export default function SongDetails() {
  const { id } = useParams();
  if (!id) return <p>Error : id not provided</p>;
  const { loading, error, data } = useQuery(queryGetSongDetails, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='row'>
      <div className='col s12'>
        <div className="section">
          <Link to='/'>Back</Link>
        </div>
        <div className="divider"></div>
        <div className="section">
          { data && data.song ?
            <>
              <h5>{data.song.title}</h5>
              <div className="divider"></div>
              <Lyrics lyrics={data.song.lyrics}/>
            </>
            : <p>No song found</p>
          }
        </div>
      </div>
    </div>
  )
}
