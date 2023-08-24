import { LiveEventListProps } from "./components/liveEventList";
import { CreateEventViewProps } from "./components/CreateEventView";
import { EventHostViewProps } from "./components/CreateEventView/eventHostView";
import { LiveEvent, LiveEventListQueryParams } from "@sendbird/live";
import { React } from 'react';

export const App: React.FunctionComponent<AppProps>;

export interface AppProps {
  userId: string;
  appId: string;
  accessToken?: string;
  customApiHost?: string;
  customWebSocketHost?: string;
  theme?: Record<string, string>;
  colorSet?: Record<string, string>;
  stringSet?: Record<string, string>;
  customize?: {
    liveEventList?: Partial<LiveEventListProps>,
    createEventView?: Partial<CreateEventViewProps>;
  };
}

export interface RenderLiveEventElemProps {
  liveEvent: LiveEvent;
  onClick: LiveEventListProps['onClickElem'];
}

export interface LiveEventListProps {
  onClickCreate: () => void;
  onClickElem: (liveEvent: LiveEvent) => void;
  queryParams?: LiveEventListQueryParams;
  renderTitle?: () => React.ReactElement;
  renderCreateButton?: () => React.ReactElement;
  renderLiveEventElem?: (props: RenderLiveEventElemProps) => React.ReactElement;
  showStatusLabel?: boolean;
  showHostNickname?: boolean;
}

export interface CreateEventViewProps {
  disableAcl?: boolean;
  showUserIdsForHostSelectionView?: boolean;
  renderCustomEventHostView?: (props: EventHostViewProps) => ReactElement;
  onClose?: (liveEvent?: LiveEvent) => void;
}
