import { useParams } from "react-router-dom";
// gives access to song id in url bar

import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { playPause, setActiveSong } from "../redux/features/playerSlice";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import PlayPause from "../components/PlayPause";

const ArtistDetails = () => {

    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player)

    const {id:artistId} = useParams();
    const { data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery(artistId);

    const handlePauseClick = () => {
        dispatch(playPause(false));
      }
    
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i}));
        dispatch(playPause(true));
      }

    if(isFetchingArtistDetails) return <Loader title="Loading Artist Details" />;
    
    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader 
                artistId={artistId}
                artistData={artistData}
             />

        <RelatedSongs 
            data={Object.values(artistData?.songs)}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
        />


        </div>
    
    );
}

export default ArtistDetails;
