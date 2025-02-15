import { faker } from '@faker-js/faker';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Amount, Erc20 } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { FollowPolicy } from '../FollowPolicy';
import { ProfileAttributes } from '../ProfileAttributes';
import {
  AttributeFragment,
  CollectModuleFragment,
  CommentFragment,
  EnabledModuleFragment,
  EnabledModulesFragment,
  Erc20AmountFragment,
  Erc20Fragment,
  FeedItemFragment,
  FollowModules,
  MediaFragment,
  MetadataFragment,
  MirrorFragment,
  ModuleInfoFragment,
  PostFragment,
  ProfileFragment,
  ProfileFollowModuleSettings,
  ProfileFollowRevenueFragment,
  ProfileMediaFragment,
  PublicationMainFocus,
  PublicationRevenueFragment,
  PublicationStatsFragment,
  ReactionTypes,
  RelayerResultFragment,
  RelayErrorFragment,
  RelayErrorReasons,
  RevenueAggregateFragment,
  RevenueFragment,
  WalletFragment,
  WhoReactedResultFragment,
} from '../generated';
import { erc20Amount } from '../utils';

export function mockMediaFragment(overrides?: Partial<MediaFragment>): MediaFragment {
  return {
    url: faker.image.imageUrl(),
    mimeType: 'image/jpeg',
    ...overrides,
    __typename: 'Media',
  };
}

export function mockProfileMediaFragment(
  overrides?: Partial<ProfileMediaFragment>,
): ProfileMediaFragment {
  return {
    original: mockMediaFragment(),
    ...overrides,
    __typename: 'MediaSet',
  };
}

export function mockAttributeFragment(overrides?: Partial<AttributeFragment>): AttributeFragment {
  return {
    key: 'answer',
    value: '42',
    displayType: 'string',
    ...overrides,
    __typename: 'Attribute',
  };
}

export function mockAnyoneFollowPolicy(): FollowPolicy {
  return {
    type: FollowPolicyType.ANYONE,
  };
}

export function mockWalletFragment(): WalletFragment {
  return {
    __typename: 'Wallet',
    defaultProfile: mockProfileFragment(),
    address: mockEthereumAddress(),
  };
}

export function mockProfileFragment(overrides?: Partial<ProfileFragment>): ProfileFragment {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: faker.datatype.uuid(),
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentence(),
    handle: faker.internet.userName(firstName, lastName),
    ownedBy: mockEthereumAddress(),
    picture: mockProfileMediaFragment(),
    coverPicture: mockProfileMediaFragment(),

    stats: {
      __typename: 'ProfileStats',
      totalFollowers: 0,
      totalFollowing: 0,
      totalPosts: 0,
      ...overrides?.stats,
    },

    dispatcher: null,

    __followModule: null,
    followPolicy: mockAnyoneFollowPolicy(),

    isFollowedByMe: false,
    isFollowing: false,
    isOptimisticFollowedByMe: false,

    ownedByMe: false,

    __attributes: [],
    attributes: {} as ProfileAttributes,

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockProfileFollowFollowModuleFragment(): ProfileFollowModuleSettings {
  return {
    __typename: 'ProfileFollowModuleSettings',
    contractAddress: mockEthereumAddress(),
    type: FollowModules.ProfileFollowModule,
  };
}

export function mockRelayerResultFragment(
  txHash: string = mockTransactionHash(),
): RelayerResultFragment {
  return {
    __typename: 'RelayerResult',
    txHash,
    txId: faker.datatype.uuid(),
  };
}

export function mockRelayErrorFragment(reason: RelayErrorReasons): RelayErrorFragment {
  return {
    __typename: 'RelayError',
    reason,
  };
}

export function mockPublicationStatsFragment(
  overrides?: Partial<PublicationStatsFragment>,
): PublicationStatsFragment {
  return {
    totalAmountOfMirrors: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfCollects: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfComments: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalUpvotes: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    ...overrides,
    __typename: 'PublicationStats',
  };
}

function mockFreeCollectModuleSettings({ followerOnly = false } = {}): CollectModuleFragment {
  return {
    __typename: 'FreeCollectModuleSettings',
    contractAddress: '0x96351D3cE872903EBf4c2D77dd625992CCFdf8c9',
    followerOnly,
  };
}

function mockMetadataFragment(): MetadataFragment {
  return {
    __typename: 'MetadataOutput',
    mainContentFocus: PublicationMainFocus.TextOnly,
    name: faker.commerce.productName(),
    description: null,
    attributes: [],
    content: faker.lorem.words(5),
    media: [],
  };
}

export function mockPostFragment(
  overrides?: Partial<Omit<PostFragment, '__typename'>>,
): PostFragment {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.datatype.datetime().toISOString(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataFragment(),
    profile: mockProfileFragment(),
    collectedBy: null,
    collectModule: mockFreeCollectModuleSettings(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,
    isGated: false,
    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    ...overrides,
    __typename: 'Post',
  };
}

export function mockCommentFragment(
  overrides?: Partial<Omit<CommentFragment, '__typename'>>,
): CommentFragment {
  const mainPost = mockPostFragment();

  return {
    id: faker.datatype.uuid(),
    stats: mockPublicationStatsFragment(),
    metadata: {
      __typename: 'MetadataOutput',
      mainContentFocus: PublicationMainFocus.TextOnly,
      name: null,
      description: null,
      attributes: [],
      content: faker.lorem.paragraph(1),
      media: [],
    },
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    collectedBy: null,
    commentOn: mainPost,
    mainPost: mainPost,
    collectModule: mockFreeCollectModuleSettings(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,
    isGated: false,
    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    ...overrides,
    __typename: 'Comment',
  };
}

export function mockMirrorFragment(
  overrides?: Partial<Omit<MirrorFragment, '__typename'>>,
): MirrorFragment {
  const mainPost = mockPostFragment();

  return {
    id: faker.datatype.uuid(),
    stats: mockPublicationStatsFragment(),
    metadata: {
      __typename: 'MetadataOutput',
      mainContentFocus: PublicationMainFocus.TextOnly,
      name: null,
      description: null,
      attributes: [],
      content: faker.lorem.paragraph(1),
      media: [],
    },
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    collectModule: mockFreeCollectModuleSettings(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    mirrorOf: mainPost,
    reaction: null,
    hidden: false,
    isGated: false,
    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    ...overrides,
    __typename: 'Mirror',
  };
}

export function mockFeedItemFragment(overrides?: Partial<FeedItemFragment>): FeedItemFragment {
  return {
    root: mockPostFragment(),
    comments: null,
    ...overrides,
    __typename: 'FeedItem',
  };
}

function mockErc20Fragment(overrides?: Partial<Omit<Erc20Fragment, '__typename'>>): Erc20Fragment {
  return {
    __typename: 'Erc20',
    name: 'Wrapped MATIC',
    symbol: 'WMATIC',
    decimals: 18,
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockErc20AmountFragment(amount = mockDaiAmount(42)): Erc20AmountFragment {
  return {
    __typename: 'Erc20Amount',
    asset: mockErc20Fragment({
      name: amount.asset.name,
      symbol: amount.asset.symbol,
      decimals: amount.asset.decimals,
      address: amount.asset.address,
    }),
    value: amount.toSignificantDigits(),
  };
}

function mockRevenueAggregateFragment(amount?: Amount<Erc20>): RevenueAggregateFragment {
  const total = mockErc20AmountFragment(amount);
  return {
    __typename: 'RevenueAggregate',
    __total: total,
    totalAmount: erc20Amount({ from: total }),
  };
}

export function mockPublicationRevenueFragment({
  publication = mockPostFragment(),
  amount,
}: {
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): PublicationRevenueFragment {
  return {
    __typename: 'PublicationRevenue',
    publication: publication,
    revenue: mockRevenueAggregateFragment(amount),
  };
}

export function mockRevenueFragment({
  amount,
}: {
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): RevenueFragment {
  return {
    __typename: 'PublicationRevenue',
    revenue: mockRevenueAggregateFragment(amount),
  };
}

export function mockProfileFollowRevenueFragment({
  amount,
}: {
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): ProfileFollowRevenueFragment {
  return {
    __typename: 'FollowRevenueResult',
    revenues: [mockRevenueAggregateFragment(amount)],
  };
}

export function mockWhoReactedResultFragment(
  overrides?: Partial<Omit<WhoReactedResultFragment, '__typename'>>,
): WhoReactedResultFragment {
  return {
    __typename: 'WhoReactedResult',
    reactionId: faker.datatype.uuid(),
    reaction: ReactionTypes.Upvote,
    reactionAt: faker.date.past().toISOString(),
    profile: mockProfileFragment(),
    ...overrides,
  };
}

export function mockModuleInfoFragment(
  overrides?: Partial<Omit<ModuleInfoFragment, '__typename'>>,
): ModuleInfoFragment {
  return {
    __typename: 'ModuleInfo',
    name: faker.datatype.string(),
    type: faker.datatype.string(),
    ...overrides,
  };
}

export function mockEnabledModuleFragment(
  overrides?: Partial<Omit<EnabledModuleFragment, '__typename'>>,
): EnabledModuleFragment {
  return {
    __typename: 'EnabledModule',
    moduleName: faker.datatype.string(),
    contractAddress: mockEthereumAddress(),
    inputParams: [mockModuleInfoFragment()],
    redeemParams: [mockModuleInfoFragment()],
    returnDataParams: [mockModuleInfoFragment()],
    ...overrides,
  };
}

export function mockEnabledModulesFragment(
  overrides?: Partial<Omit<EnabledModulesFragment, '__typename'>>,
): EnabledModulesFragment {
  return {
    __typename: 'EnabledModules',
    collectModules: [mockEnabledModuleFragment()],
    followModules: [mockEnabledModuleFragment()],
    referenceModules: [mockEnabledModuleFragment()],
    ...overrides,
  };
}
