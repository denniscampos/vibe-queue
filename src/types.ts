export type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export type SpotifyRefreshTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type VibeContextType = {
  isLoggedIn: string;
  setIsLoggedIn: (value: string) => void;
  generatedId: string | null;
  setGeneratedId: (value: string) => void;
};

export type TrackPayload = {
  name: string;
  artist: string;
  albumCover: string;
  progress_ms: number;
  duration_ms: number;
};
