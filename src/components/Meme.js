import React, { useState, useEffect } from 'react'

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: 'One does not simply',
        bottomText: 'walk into Mordor',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes))
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className='form'>
                <input
                    type='text'
                    className='form--input'
                    placeholder='Top text'
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input
                    type='text'
                    className='form--input'
                    placeholder='Bottom text'
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button
                    className='form--button'
                    onClick={getMemeImage}
                >
                    Get a new image
                </button>
            </div>
            <div className='meme'>
                <h2 className='meme--top'>{meme.topText}</h2>
                <img src={meme.randomImage} className='meme--image' alt='meme' />
                <h2 className='meme--bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}
