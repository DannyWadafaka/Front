import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    
    const [state, setState] = useState({loaded: false, data: null});

    useEffect(() => {
    
        axios.get(url)
            .then(({data}) => setState({

                loaded: true,
                data

            }))

    }, [url]);

    return state;

}