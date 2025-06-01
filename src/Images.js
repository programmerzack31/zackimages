import React, { useState } from 'react';
import axios from 'axios';

const Images = () => {
    const apiId = `0MnTzmKDssTeGJGWrXnlq1J47hZsLjuPaS4KIqMf7Ho`;
    const [imgdata, setimgdata] = useState([]);
    const [query, setquery] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');
    const [msg, setmsg] = useState("Visual Search Engine for the Next Gen.");

    const fetchimg = async () => {
        const searchTerm = query.trim();
        if (!searchTerm) {
            setmsg("Please enter a search term");
            return;
        }

        setloading(true);
        seterror('');
        setmsg("Loading...");
        try {
            const response = await axios.get(
                `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${apiId}`
            );
            const results = response.data.results;
            setimgdata(results);

            if (results.length === 0) {
                setmsg("No images found");
            } else {
                setmsg(`Results for "${searchTerm}"`);
            }

            setquery('');
        } catch (err) {
            seterror('Image Not Found');
            setmsg('Image not found');
        } finally {
            setloading(false);
        }
    };

    const handelkey = (e) => {
        if (e.key === 'Enter') {
            fetchimg();
        }
    };

    return (
        <div className='imgapp'>
            <h1 className='mytag'>Devloped by Zeeshan sheikh</h1>
            <nav className='menubar'>
                
                <input
                    onChange={(e) => setquery(e.target.value)}
                    value={query}
                    placeholder='Search...'
                    onKeyDown={handelkey}
                    disabled={loading}
                />
                {/* <span style={{ color: 'white', fontWeight: '400' }}>Devloped By Zeeshn</span> */}
            </nav>
            <div className='msgbox'>

            {!error && !loading && (
                <h1
                    style={{
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontFamily: 'sans-serif',
                        fontWeight: '400',
                        color: 'black'
                    }}
                >
                    {msg}
                </h1>
            )}

            {loading && (
                <h1
                    style={{
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontFamily: 'sans-serif',
                        fontWeight: '400',
                        color: 'black'
                    }}
                >
                    Loading...
                </h1>
            )}

            {error && (
                <p style={{ textAlign: 'center', color: 'red' }}>
                    Image not found
                </p>
            )}
</div>
            <div className='imgcontainer'>
                {imgdata.map((img, index) => (
                    <div className='imgbox' key={index}>
                        <img
                            src={img.urls.small}
                            alt={img.alt_description || 'Unsplash Image'}
                        />
                        <a href={img.links.download} target='_blank' rel='noopener noreferrer'>
                            <button className="button">
                                <span className="button-content">Download</span>
                            </button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
