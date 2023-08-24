import React, { useContext, useEffect, useRef, useState } from 'react';
import { LiveEvent, LiveEventState } from "@sendbird/live";

import './index.scss';
import IconUser from "../../../assets/svg/icons-user.svg";
import { useToast } from './Toast';
import RightPanel from "../../RightPanel";
import useModal from "../../../hooks/useModal";
import EndedModalView from "./EndedModalView";
import { SendbirdLiveContext } from "../../../lib/sendbirdLiveContext";

const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface OnEndEventClickedProps {
  onClick: () => void;
}

interface ParticipantViewProps {
  liveEvent: LiveEvent;
  onClose: (liveEvent?: LiveEvent) => void;
  showDuration?: boolean;
  onEndEventClick?: (props: OnEndEventClickedProps) => void;
  showStatusLabel?: boolean;
  showParticipantCount?: boolean;
  eventEndViewDisplayTime?: number;
}

export default function ParticipantView(props: ParticipantViewProps) {
  const {
    liveEvent,
    onClose,
    showDuration,
    onEndEventClick,
    showStatusLabel,
    showParticipantCount,
    eventEndViewDisplayTime,
  } = props;

  const video = useRef<HTMLVideoElement>(null);
  const [Toast, notify, reset] = useToast();
  const [host, setHost] = useState(liveEvent.host);
  const [title, setTitle] = useState(liveEvent.title);
  const [coverUrl, setCoverUrl] = useState(liveEvent.coverUrl);
  const [state, setState] = useState(liveEvent.state);
  const [participantCount, setParticipantCount] = useState(liveEvent.participantCount || 0);
  const [EndedModal, openEndedModal, closeEndedModal] = useModal('', '');
  const [modalTimer, setModalTimer] = useState<ReturnType<typeof setTimeout>>();

  const { stringSet } = useContext(SendbirdLiveContext);

  const mapStateName = (name: string) => {
    switch (name) {
      case 'created':
        return stringSet.EVENT_STATUS_CREATED;
      case 'ready':
        return stringSet.EVENT_STATUS_READY;
      case 'ongoing':
        return stringSet.EVENT_STATUS_ONGOING;
      case 'ended':
        return stringSet.EVENT_STATUS_ENDED;
    }
  }

  const setup = async () => {
    if (host) liveEvent.setVideoViewForLiveEvent(video.current!, host.hostId);
  };

  const _openEndedModal = () => {
    openEndedModal();

    const timer = setTimeout(() => {
      exit();
    }, eventEndViewDisplayTime ?? 3000);

    setModalTimer(timer);
  };

  const exit = async () => {
    clearTimeout(modalTimer);
    setModalTimer(undefined);

    closeEndedModal();
    onClose(liveEvent);
  };

  useEffect(() => {
    setup();
  }, [host, state]);

  useEffect(() => {
    if (liveEvent.state === LiveEventState.CREATED) {
      notify('Live event will begin soon.');
    }

    const unsubscribers = [
      liveEvent.on('liveEventStarted', () => {
        setState(liveEvent.state);
      }),
      liveEvent.on('liveEventEnded', () => {
        setState(liveEvent.state);
        _openEndedModal();
      }),
      liveEvent.on('hostEntered', () => {
        notify('Host Entered');
        setHost(liveEvent.host);
      }),
      liveEvent.on('hostConnected', (liveEvent, host) => {
        notify('Host Connected');
        setHost(liveEvent.host);
      }),
      liveEvent.on('hostDisconnected', () => {
        notify('Host Disconnected');
        setHost(liveEvent.host);
      }),
      liveEvent.on('hostExited', () => {
        notify('Host Exited');
        setHost(liveEvent.host);
      }),
      liveEvent.on('hostMutedAudio', () => {
        notify('Host is muted');
        setHost(liveEvent.host);
      }),
      liveEvent.on('hostUnmutedAudio', () => {
        notify('Host is unmuted');
        setHost(liveEvent.host);
      }),
      liveEvent.on('participantEntered', (...args) => {
        setParticipantCount(liveEvent.participantCount);
      }),
      liveEvent.on('participantExited', (...args) => {
        setParticipantCount(liveEvent.participantCount);
      }),
      liveEvent.on('liveEventUpdated', () => {
        setTitle(liveEvent.title);
        setCoverUrl(liveEvent.coverUrl);
      }),
      liveEvent.on('disconnected', () => {
        onClose(liveEvent);
      }),
    ];

    return () => {
      unsubscribers.map(unsubscriber => unsubscriber());
    }
  }, [liveEvent]);

  function getMM(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);

    minutes = minutes % 60;

    return `${minutes < 0 ? 0 : minutes}`;
  }

  return (
    <div className="participant-view">
      <div className="participant-view__main">
        <Toast />
        <div className="video-wrapper">
          <video className="participant-view__video" ref={video} playsInline autoPlay controls={isSafari()}/>
        </div>
        <div className="participant-view__info">
          <div className="participant-view__profile">
            {
              (coverUrl) ?
                <img src={coverUrl} alt='cover image' className='participant-view__profile__cover-image' /> :
                <IconUser viewBox='-4 -4 20 20' width={56} height={56} />
            }
          </div>
          <div className="participant-view__info__wrapper">
            <div className="participant-view__title__wrapper">
              <div className={`event-state--${state}`}>{mapStateName(state)}</div>
              <div className="participant-view__title">{title ? title : stringSet.CREATE_EVENT_DEFAULT_TITLE}</div>
            </div>
            <div className="participant-view__detail">{participantCount ?? 0} watching now { state === LiveEventState.ONGOING ? `∙ Started ${getMM(liveEvent.duration)} mins ago` : '' }</div>
            <div className="participant-view__host-name">{host ? host.nickname || ' ' : 'No Host'}</div>
          </div>
        </div>
      </div>
      <RightPanel liveEvent={liveEvent} />
      <EndedModal>
        <EndedModalView onClose={exit} />
      </EndedModal>
    </div>
  )
}