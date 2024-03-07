import { useEffect, useState } from 'react';

const Exercise = (exerciseId) => {
    const [videoUrl, setVideoUrl] = useState('');
    const EXERCISE_DB_KEY = import.meta.env.VITE_EXERCISE_DB_KEY
    // Fetches video URL based on the exerciseId
    useEffect(() => {
        const fetchVideoUrl = async () => {
            const options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/name/bench',
                params: { limit: '10' },
                headers: {
                    'X-RapidAPI-Key': EXERCISE_DB_KEY,
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const url = `https://exercisedb.p.rapidapi.com/exercises/name/${exerciseId}`;
                const response = await fetch(url, options);
                const data = await response.json();

                if (data && data.videoUrl) {
                    setVideoUrl(data.videoUrl);
                } else {
                    console.log('No video found for this exercise.');
                }
            } catch (error) {
                console.error('Error fetching exercise video:', error);
            }
        };

        if (exerciseId) {
            fetchVideoUrl();
        }
    }, [exerciseId, EXERCISE_DB_KEY]);

    return (
        <div className="exercise-container">
            <div className="header">
                <span className="username">{username}</span>
            </div>
            <div className="video-container">
                {videoUrl ? (
                    <video controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <p>Loading exercise video...


                        The back squat is a powerful exercise that targets the lower body, including the quadriceps, hamstrings, glutes, and lower back. Here’s a straightforward guide to performing a back squat correctly:

                        Start Position:

                        Stand upright with your feet shoulder-width apart or slightly wider. Your toes should be slightly pointed outwards.
                        Place a barbell on your upper back (not your neck) across the shoulders. Secure the bar on your traps (the muscle on the upper part of your back) for a high bar squat or just above the shoulder blades for a low bar squat.
                        Grip the bar wider than shoulder-width, with your hands facing forward. Your elbows should point downwards to help keep the bar in place.
                        The Descent:

                        Begin by taking a deep breath and holding it to brace your core, keeping your spine neutral and chest up.
                        Bend at the hips and knees simultaneously as if you’re sitting back into a chair. Keep your knees in line with your toes, and don’t let them collapse inward.
                        Lower yourself until at least the tops of your thighs are parallel to the ground. Some people may go lower, but depth depends on your mobility and comfort.
                        The Ascent:

                        Drive through your heels and midfoot to stand back up, keeping the bar balanced over the middle of your feet.
                        Extend your hips and knees at the same rate to return to the starting position, exhaling as you rise.
                        Keep your core braced, and avoid rounding your back throughout the movement.
                        Safety Tips:

                        Warm up properly before attempting heavy squats.
                        Use a spotter or safety bars when squatting with heavier weights.
                        Start with lighter weights to master the form before progressing to heavier loads.
                        Ensure your form is correct to avoid injury and maximize the effectiveness of the exercise.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Exercise;
