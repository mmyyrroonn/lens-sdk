import { LensConfig, LensProvider, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { Home } from './HomePage';
import { AuthenticationPage } from './authentication/AuthenticationPage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GenericErrorBoundary } from './components/GenericErrorBoundary';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Header } from './components/header/Header';
import { DiscoveryPage } from './discovery/DiscoveryPage';
import { UseExploreProfiles } from './discovery/UseExploreProfiles';
import { UseExplorePublications } from './discovery/UseExplorePublications';
import { Feed } from './discovery/UseFeed';
import { UseSearchProfiles } from './discovery/UseSearchProfiles';
import { UseSearchPublications } from './discovery/UseSearchPublications';
import { MiscPage } from './misc/MiscPage';
import { UseCurrencies } from './misc/UseCurrencies';
import { UseEnabledModules } from './misc/UseEnabledModules';
import { UseNotifications } from './misc/UseNotifications';
import { UseUnreadNotificationCount } from './misc/UseUnreadNotificationCount';
import { ProfilesPage } from './profiles/ProfilesPage';
import { UseActiveProfileSwitch } from './profiles/UseActiveProfileSwitch';
import { UseCreateProfile } from './profiles/UseCreateProfile';
import { UseFollowAndUnfollow } from './profiles/UseFollowAndUnfollow';
import { UseMutualFollowers } from './profiles/UseMutualFollowers';
import { ProfileByHandle } from './profiles/UseProfileByHandle';
import { ProfileById } from './profiles/UseProfileById';
import { UseProfileFollowers } from './profiles/UseProfileFollowers';
import { UseProfileFollowing } from './profiles/UseProfileFollowing';
import { UseProfilesOwnedBy } from './profiles/UseProfileOwnedBy';
import { ProfilesToFollow } from './profiles/UseProfilesToFollow';
import { UseUpdateDispatcherConfig } from './profiles/UseUpdateDispatcherConfig';
import { UseUpdateFollowPolicy } from './profiles/UseUpdateFollowPolicy';
import { UseUpdateProfileDetails } from './profiles/UseUpdateProfileDetails';
import { UseUpdateProfileImage } from './profiles/UseUpdateProfileImage';
import { PublicationsPage } from './publications/PublicationsPage';
import { UseCollectedPublications } from './publications/UseCollectedPublications';
import { UseCreateComment } from './publications/UseCreateComment';
import { UseCreateMirror } from './publications/UseCreateMirror';
import { UseCreatePost } from './publications/UseCreatePost';
import { UseHidePublication } from './publications/UseHidePublication';
import { UsePublication } from './publications/UsePublication';
import { UsePublications } from './publications/UsePublications';
import { UseReaction } from './publications/UseReaction';
import { UseReportPublication } from './publications/UseReportPublication';
import { UseWhoCollectedPublication } from './publications/UseWhoCollectedPublication';
import { UseWhoMirroredPublication } from './publications/UseWhoMirroredPublication';
import { UseWhoReacted } from './publications/UseWhoReacted';
import { RevenuePage } from './revenue/RevenuePage';
import { UseProfileFollowRevenue } from './revenue/UseProfileFollowRevenue';
import { UseProfilePublicationRevenue } from './revenue/UseProfilePublicationRevenue';
import { UsePublicationRevenue } from './revenue/UsePublicationRevenue';

const { provider, webSocketProvider } = configureChains([polygon], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  sources: [],
  // or narrow to the one you are interested in
  // sources: [sources.lenster, sources.orb, 'any-other-app-id'],
  storage: localStorage(),
};

const toastNotification = (error: Error) => toast.error(error.message);

export function App() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig} onError={toastNotification}>
        <Router>
          <Header />
          <main>
            <Breadcrumbs />
            <GenericErrorBoundary fallback={ErrorMessage}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authentication" element={<AuthenticationPage />} />

                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/publications/usePublication" element={<UsePublication />} />
                <Route path="/publications/usePublications" element={<UsePublications />} />
                <Route path="/publications/useComments" element={<UsePublication />} />
                <Route
                  path="/publications/useCollectedPublications"
                  element={<UseCollectedPublications />}
                />
                <Route path="/publications/useCreatePost" element={<UseCreatePost />} />
                <Route path="/publications/useCreateComment" element={<UseCreateComment />} />
                <Route path="/publications/useReaction" element={<UseReaction />} />
                <Route path="/publications/useWhoReacted" element={<UseWhoReacted />} />
                <Route
                  path="/publications/useReportPublication"
                  element={<UseReportPublication />}
                />
                <Route path="/publications/useHidePublication" element={<UseHidePublication />} />
                <Route
                  path="/publications/useWhoCollectedPublication"
                  element={<UseWhoCollectedPublication />}
                />
                <Route path="/publications/UseCreateMirror" element={<UseCreateMirror />} />
                <Route
                  path="/publications/useWhoMirroredPublication"
                  element={<UseWhoMirroredPublication />}
                />

                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profiles/useCreateProfile" element={<UseCreateProfile />} />
                <Route path="/profiles/useProfile-handle" element={<ProfileByHandle />} />
                <Route path="/profiles/useProfile-id" element={<ProfileById />} />
                <Route
                  path="/profiles/useUpdateDispatcherConfig"
                  element={<UseUpdateDispatcherConfig />}
                />
                <Route path="/profiles/useMutualFollowers" element={<UseMutualFollowers />} />
                <Route path="/profiles/useProfilesToFollow" element={<ProfilesToFollow />} />
                <Route path="/profiles/useFollow" element={<UseFollowAndUnfollow />} />
                <Route path="/profiles/useUpdateProfileImage" element={<UseUpdateProfileImage />} />
                <Route path="/profiles/useUpdateFollowPolicy" element={<UseUpdateFollowPolicy />} />
                <Route
                  path="/profiles/useUpdateProfileDetails"
                  element={<UseUpdateProfileDetails />}
                />
                <Route
                  path="/profiles/useActiveProfileSwitch"
                  element={<UseActiveProfileSwitch />}
                />
                <Route path="/profiles/useProfilesOwnedBy" element={<UseProfilesOwnedBy />} />
                <Route path="/profiles/useProfileFollowers" element={<UseProfileFollowers />} />
                <Route path="/profiles/useProfileFollowing" element={<UseProfileFollowing />} />

                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/discovery/useFeed" element={<Feed />} />
                <Route path="/discovery/useExploreProfiles" element={<UseExploreProfiles />} />
                <Route
                  path="/discovery/useExplorePublications"
                  element={<UseExplorePublications />}
                />
                <Route path="/discovery/useSearchProfiles" element={<UseSearchProfiles />} />
                <Route
                  path="/discovery/useSearchPublications"
                  element={<UseSearchPublications />}
                />

                <Route path="/revenue" element={<RevenuePage />} />
                <Route path="/revenue/usePublicationRevenue" element={<UsePublicationRevenue />} />
                <Route
                  path="/revenue/useProfileFollowRevenue"
                  element={<UseProfileFollowRevenue />}
                />
                <Route
                  path="/revenue/useProfilePublicationRevenue"
                  element={<UseProfilePublicationRevenue />}
                />

                <Route path="/misc" element={<MiscPage />} />
                <Route path="/misc/useCurrencies" element={<UseCurrencies />} />
                <Route path="/misc/useEnabledModules" element={<UseEnabledModules />} />
                <Route path="/misc/useNotifications" element={<UseNotifications />} />
                <Route
                  path="/misc/useUnreadNotificationCount"
                  element={<UseUnreadNotificationCount />}
                />
              </Routes>
            </GenericErrorBoundary>
            <Toaster />
          </main>
        </Router>
      </LensProvider>
    </WagmiConfig>
  );
}
