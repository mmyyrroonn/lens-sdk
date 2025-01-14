import { ProfileFragment, useExploreProfiles, useFollow, useUnfollow } from '@lens-protocol/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type FollowButtonProps = {
  profile: ProfileFragment;
};

function FollowButton({ profile }: FollowButtonProps) {
  const { follow, isPending: isFollowing } = useFollow({ profile });
  const { unfollow, isPending: isUnfollowing, error } = useUnfollow({ profile });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe)
    return (
      <button onClick={unfollow} disabled={isUnfollowing}>
        Unfollow
      </button>
    );

  return (
    <button onClick={follow} disabled={isFollowing}>
      Follow
    </button>
  );
}

type ProfileFollowProps = {
  profile: ProfileFragment;
};

function ProfileFollow({ profile }: ProfileFollowProps) {
  return (
    <article>
      <ProfileCard profile={profile} />
      <FollowButton profile={profile} />
    </article>
  );
}

type UseFollowInnerProps = {
  activeProfile: ProfileFragment;
};

function UseFollowInner({ activeProfile }: UseFollowInnerProps) {
  const { data, error, loading } = useExploreProfiles({ observerId: activeProfile.id, limit: 50 });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.map((profile: ProfileFragment) => (
        <ProfileFollow key={profile.handle} profile={profile} />
      ))}
    </>
  );
}

export function UseFollowAndUnfollow() {
  return (
    <div>
      <h1>
        <code>useFollow / useUnFollow</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <UseFollowInner activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to follow or unfollow profiles" />
    </div>
  );
}
