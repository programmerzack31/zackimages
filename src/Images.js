import React, { useState } from 'react'
import axios from 'axios';
const Images = () => {
    const apiId = `0MnTzmKDssTeGJGWrXnlq1J47hZsLjuPaS4KIqMf7Ho`;
    const [imgdata, setimgdata] = useState([]);
    const [query, setquery] = useState('');
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState('');
    const [msg, setmsg] = useState("Search Image You Want");
    const fetchimg = async () => {
        setloading(true);
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiId}`);
            setimgdata(response.data.results);

        }
        catch (err) {
            seterr('Image Not Found');
            setloading(false);
        }
        finally {
            setloading(false);
            setmsg(query)
        }
    }


    return (
        <div>
            <nav className='menubar'>
                <h2 style={{ color: 'white', fontWeight: '400' }}>ZackPac Images</h2>
                <input onChange={(e) => setquery(e.target.value)} />
                <button onClick={fetchimg}>Fetch data</button>
            </nav>
            <h1 style={{
                textAlign: 'center', marginBottom: '40px', fontFamily: 'sans-serif', fontWeight: '400 ',
                color: 'darkpurple'
            }}>{msg}</h1>
            {loading && <p style={{ textAlign: 'center' }}>loading....</p>}
            {err && <p style={{ textAlign: 'center',color:'red' }}>Image not found</p>}
            <div className='imgcontainer'>
                {imgdata.map((img, index) => (
                    <div className='imgbox' key={index}>
                        <img src={img.urls.small} />
                        <a href={img.links.download} target='blank'><button class="button">
                            <span class="button-content">Download </span>
                        </button>
                        </a>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Images