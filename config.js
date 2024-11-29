const config = {
    API_URL: import.meta.env.PROD
        ? 'https://puzzle-game-backend-a7gf.onrender.com/api'
        : 'http://localhost:5000/api'
};

export default config;