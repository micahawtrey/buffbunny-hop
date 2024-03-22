export const FETCH_GYM_PICTURES_REQUEST = "FETCH_GYM_PICTURES_REQUEST";
export const FETCH_GYM_PICTURES_SUCCESS = "FETCH_GYM_PICTURES_SUCCESS";
export const FETCH_GYM_PICTURES_FAILURE = "FETCH_GYM_PICTURES_FAILURE"

const apiKey = import.meta.env.REACT_APP_API_KEY;

export const fetchGymPicturesRequest = () => ({
    type: FETCH_GYM_PICTURES_REQUEST,
});

export const fetchGymPicturesSuccess = (pictures) => ({
    type: FETCH_GYM_PICTURES_SUCCESS,
    payload: pictures,
});

export const fetchGymPicturesFailure = (error) => ({
    type: FETCH_GYM_PICTURES_FAILURE,
    payload: error,
});

export const fetchRandomGymPictures = () => {
    return (dispatch) => {
        dispatch(fetchGymPicturesRequest());
        fetch('https://api.pexels.com/v1/search?query=gym+workout&per_page=10', {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            mode: 'no-cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                const pictures = data.photos.map(photo => photo.src.medium);
                dispatch(fetchGymPicturesSuccess(pictures));
            } else {
                throw new Error('No photos found');
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            dispatch(fetchGymPicturesFailure(error.toString()));
        });
    };
};
