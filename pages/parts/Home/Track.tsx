import React, { FunctionComponent } from "react";
import RecordSVG from "./RecordSVG";

type Props = {
    searchResult: {
        type: string,
        name: string,
        url: string,
        image: string,
        length: number,
        release: string,
        artists: {
            name: string,
            url:string
        }[],
        album?: {
            name: string,
            url:string,
            length: number,
            discNumber: number
        }
    } 
    index: number,
    width: number
}

const Track:FunctionComponent<Props> = (props) => {
    return <div key={props.index} className={`Result ${props.searchResult.type === 'album' ? 'Album' : 'Song'}`} style={{
        width: `${props.width}px`
    }}>
        <div className="AlbumCover">
            <RecordSVG color={props.searchResult.type === 'album' ? 'lightPurple' : 'yellow'}></RecordSVG>
            <img src={props.searchResult.image}></img>
            <p className="Button">Recommend</p>
        </div>
        <p className="Type">{props.searchResult.type}</p>
        <a className="Title" href={props.searchResult.url} target='_blank'>
            {props.searchResult.name}
            <i className="fa-solid fa-angle-right"></i>
        </a>
        {props.searchResult.album ? <p className="Album">
            Album: 
            <span>
                <a className="Link" href={props.searchResult.album.url} target='_blank'>
                    {props.searchResult.album.name}
                    <i className="fa-solid fa-angle-right"></i>
                </a>
                {`(${props.searchResult.album.discNumber}/${props.searchResult.album.length})`}
            </span>
        </p> : <></>}
        {props.searchResult.album ? 
            <p className="SongLength">
                Song Length:
                <span>{`${Math.floor((props.searchResult.length/1000) / 60)}m ${Math.floor((props.searchResult.length/1000) % 60)}s`}</span>
            </p>
        :
            <p className="AlbumLength">
                Songs:
                <span>{props.searchResult.length}</span>
            </p>
        }
        <p className="Artist">
            Artists: 
            <span>
                {props.searchResult.artists.map((artist, j) => {
                return <a key={j} className="Link" href={artist.url} target='_blank'>
                    {artist.name}
                    <i className="fa-solid fa-angle-right"></i>
                </a>
                })}
            </span>
        </p>
        <p className="Release">
            Released: 
            <span>{props.searchResult.release}</span>
        </p>
    </div>
}

export default Track;