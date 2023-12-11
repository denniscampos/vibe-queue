export const userProfile = async (accessToken: string) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  const { id, display_name, email, images } = data;

  const profileData = {
    id,
    display_name,
    email,
    images,
  };

  localStorage.setItem('user_profile', JSON.stringify(profileData));
};
