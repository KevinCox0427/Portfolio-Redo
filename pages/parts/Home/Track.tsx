import React, { FunctionComponent } from "react";
import RecordSVG from "./RecordSVG";

type Props = {
    searchResult: {
        type: string,
        id: string,
        name: string,
        url: string,
        image: string,
        length: number,
        release: string,
        artists: {
            name: string,
            url:string
        }[],
        album: {
            name: string,
            url:string,
            length: number,
            discNumber: number
        }
    }
    width: number,
    isRecommend: boolean,
    search: (title:string, isRecommend: boolean) => Promise<void>
}

const Track:FunctionComponent<Props> = (props) => {
    return <div className="Result" style={{
        width: `${props.width}px`
    }}>
        <div className={`AlbumCover ${props.isRecommend ? '' : 'Hover'}`} onClick={() => {
            props.search(props.searchResult.id, true);
        }} style={{
            pointerEvents: 'none'
        }}>
            <RecordSVG></RecordSVG>
            <img src={props.searchResult.image} style={{
                width: `${props.width}px`,
                height: `${props.width}px`
            }}></img>
            {props.isRecommend ? <></> : <p className="Button">Recommend</p>}
        </div>
        <a className="Title" href={props.searchResult.url} target='_blank'>
            {props.searchResult.name}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <p className="Artist">
            Artists: 
            <span>
                {props.searchResult.artists.map((artist, j) => {
                return <a key={j} className="Link" href={artist.url} target='_blank'>
                    {artist.name}
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                })}
            </span>
        </p>
        <p className="Album">
            Album: 
            <span>
                <a className="Link" href={props.searchResult.album.url} target='_blank'>
                    {props.searchResult.album.name}
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </span>
        </p>
        <p className="TrackNumber">
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
}

export default Track;