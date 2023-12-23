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
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  generatedId: string | null;
  setGeneratedId: (value: string) => void;
};
