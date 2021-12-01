import React from "react";

export default function RandomGif(props) {
  const gifs = [
    'https://media.giphy.com/media/oKPwF6d0KJC8T2WLEI/giphy.gif',
    'https://media.giphy.com/media/l0HFkA6omUyjVYqw8/giphy.gif',
    'https://media.giphy.com/media/xT8qB4foF1nxHZwpLa/giphy.gif'
  ];
  const selectedGif = gifs[Math.floor(Math.random() * gifs.length)];
  return <img src={selectedGif} style={props.style}/>
}
