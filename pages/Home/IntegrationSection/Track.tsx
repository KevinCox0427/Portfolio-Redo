import React, { Fragment, FunctionComponent } from "react";
import RecordSVG from "./RecordSVG";
import { SpotifyResponseSong } from "./IntegrationSection";

type Props = {
    searchResult: SpotifyResponseSong
    width: number,
    isRecommend: boolean,
    search: (title:string, isRecommend: boolean) => Promise<void>
}

const Track:FunctionComponent<Props> = (props) => {
    return <div className="Result" style={{
        width: `${props.width}px`
    }}>
        {props.isRecommend ? 
            <a className="AlbumCover" href={props.searchResult.url} target="_blank" rel="nofollow">
                <RecordSVG></RecordSVG>
                <img src={props.searchResult.image} alt="Spofity album cover" loading="lazy" style={{
                    width: `${props.width}px`,
                    height: `${props.width}px`
                }}></img>
            </a>
        :
            <a className="AlbumCover" href="/#SpotifyRecommendation" onClick={() => {
                props.search(props.searchResult.id, true);
            }}>
                <RecordSVG></RecordSVG>
                <img src={props.searchResult.image} alt="Spofity album cover" loading="lazy" style={{
                    width: `${props.width}px`,
                    height: `${props.width}px`
                }}></img>
                <p className="Button">Recommend</p>
            </a>
        }
        <div className="Details">
            <a className="Title" href={props.searchResult.url} target='_blank' rel="nofollow">
                {props.searchResult.name}
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <p className="Artist" data-html2canvas-ignore={true}>
                Artists: 
                <span>
                    {props.searchResult.artists.map((artist, j) => {
                    return j < 3 ? 
                        <a key={j} className="Link" href={artist.url} target='_blank' rel="nofollow">
                            {artist.name}
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a> 
                    :   
                        <Fragment key={j}></Fragment>
                    })}
                </span>
            </p>
            <p className="Album" data-html2canvas-ignore={true}>
                Album: 
                <span>
                    <a className="Link" href={props.searchResult.album.url} target='_blank' rel="nofollow">
                        {props.searchResult.album.name}
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </span>
            </p>
            <p className="TrackNumber" >
                Track Number: <span>{`${props.searchResult.album.discNumber} / ${props.searchResult.album.length}`}</span>
            </p>
            <p className="SongLength">
                Song Length:
                <span>{`${Math.floor((props.searchResult.length/1000) / 60)}m ${Math.floor((props.searchResult.length/1000) % 60)}s`}</span>
            </p>
            <p className="Release">
                Released: 
                <span>{props.searchResult.release}</span>
            </p>
        </div>
    </div>
}

export default Track;