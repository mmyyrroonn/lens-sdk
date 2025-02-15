import { useProfilesToFollow, ProfileFragment } from '@lens-protocol/react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type ProfileListProps = {
  profiles: ProfileFragment[];
};

function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

export function ProfilesToFollow() {
  const { data: profilesToFollow, error, loading } = useProfilesToFollow();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>Profiles To Follow</h2>
      <ProfileList profiles={profilesToFollow} />
    </div>
  );
}
