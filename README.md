# Vibes Queue

A way for your chat to add a song to the queue while streaming.

## WIP

- [x] Spotify's Auth
- [x] Ability to add tracks to the playlist
- [ ] Hook up Twitch's API
- [ ] Connect chat to add items to the Queue
- [ ] Add unit testing.

## Set up the project locally

Add the following to `.env.local` file

```bash
VITE_SPOTIFY_CLIENT_ID=
VITE_SPOTIFY_CLIENT_SECRET=
VITE_SPOTIFY_API_URL="https://api.spotify.com"
VITE_BASE_URL="http://localhost:5173"
```

Start the dev server
`pnpm dev`
