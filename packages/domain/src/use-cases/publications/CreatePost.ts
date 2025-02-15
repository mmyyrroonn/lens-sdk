import { invariant } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';
import { CollectPolicy, ContentFocus, Locale, Media, ReferencePolicy } from './types';

export type CreatePostRequest = {
  content?: string;
  contentFocus: ContentFocus;

  media?: Media[];
  reference: ReferencePolicy;
  collect: CollectPolicy;
  profileId: string;
  kind: TransactionKind.CREATE_POST;
  locale: Locale;
  delegate: boolean;
};

export type ICreatePostCallGateway = IDelegableProtocolCallGateway<CreatePostRequest> &
  IUnsignedProtocolCallGateway<CreatePostRequest>;

export type ICreatePostPresenter = IProtocolCallPresenter;

export class CreatePost extends DelegableProtocolCallUseCase<CreatePostRequest> {
  async execute(request: CreatePostRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');
    await super.execute(request);
  }
}
