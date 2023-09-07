import React, { useContext, useEffect, useRef, useState } from 'react';
import { LiveEvent, LiveEventState } from "@sendbird/live";

import './index.scss';
import { ReactComponent as IconUser } from "../../../assets/svg/icons-user.svg";
import ControlBar from './controlBar';
import useModal from "../../../hooks/useModal";
import ConfirmEndDialog from "../../ConfirmEndDialog";
import RightPanel from '../../RightPanel';
import { SendbirdLiveContext } from "../../../lib/sendbirdLiveContext";
import Settings from "./Settings";

const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface HostViewProps {
  liveEvent: LiveEvent;
  onClose: (liveEvent?: LiveEvent) => void;
}

export default function HostView(props: HostViewProps) {
  const {
    liveEvent,
    onClose,
  } = props;

  const { stringSet } = useContext(SendbirdLiveContext);

  const video = useRef<HTMLVideoElement>(null);
  const [title, setTitle] = useState(liveEvent.title);
  const [coverUrl, setCoverUrl] = useState(liveEvent.coverUrl);
  const [state, setState] = useState(liveEvent.state);
  const [participantCount, setParticipantCount] = useState(liveEvent.participantCount || 0);
  const [EndModal, openEndModal, closeEndModal] = useModal('', 'dark-background');
  const [SettingsModal, openSettingsModal, closeSettingsModal] = useModal('');

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

  useEffect(() => {
    const setup = async () => {
      if (liveEvent.state === LiveEventState.CREATED) {
        await liveEvent.setEventReady();
      }

      if (liveEvent.state === LiveEventState.ONGOING && !liveEvent.isHostStreaming) {
        await liveEvent.startStreaming({ turnVideoOn: true, turnAudioOn: true });
        liveEvent.setVideoViewForLiveEvent(video.current!, liveEvent.host.hostId);
      }
    }

    setup();
  }, [liveEvent]);

  useEffect(() => {
    const unsubscribers = [
      liveEvent.on('participantCountChanged', (liveEvent, participantCountInfo) => {
        setParticipantCount(participantCountInfo.participantCount);
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
    <div className="host-view">
      <div className="host-view__main">
        <div className={`video-wrapper ${liveEvent.state === LiveEventState.ONGOING ? 'video-wrapper-active' : ''}`}>
          {
            (liveEvent.coverUrl) ?
              <img src={coverUrl} alt='cover image' className='host-view__video__cover-image' /> :
              <IconUser viewBox='-4 -4 20 20' width={160} height={160} />
          }
        </div>
        <div className="host-view__info">
          <div className="host-view__profile">
            {
              (liveEvent.coverUrl) ?
                <img src={coverUrl} alt='cover image' className='host-view__profile__cover-image' /> :
                <IconUser viewBox='-4 -4 20 20' width={56} height={56} />
            }
          </div>
          <div className="host-view__info__wrapper">
            <div className="host-view__title__wrapper">
              <div className={`event-state--${state}`}>{mapStateName(state)}</div>
              <div className="host-view__title">{title ? title : liveEvent.createdBy + stringSet.CREATE_EVENT_DEFAULT_TITLE}</div>
            </div>
            <div className="host-view__detail">{participantCount ?? 0} watching now { state === LiveEventState.ONGOING ? `∙ Started ${getMM(liveEvent.duration)} mins ago` : '' }</div>
            <div className="host-view__host-name">{liveEvent.host ? liveEvent.host.nickname : 'No Host'}</div>
          </div>
        </div>
        <ControlBar
          liveEvent={liveEvent}
          onStart={(liveEvent) => {
            liveEvent.setVideoViewForLiveEvent(video.current!, liveEvent.host.hostId);
            setState(liveEvent.state);
          }}
          onEnd={() => {
            openEndModal();
          }}
          onSettings={() => {
            openSettingsModal();
          }}
        />
        <EndModal>
          <ConfirmEndDialog
            onExit={async (isEnding) => {
              if (isEnding) {
                await liveEvent.endEvent();
              } else {
                await liveEvent.exitAsHost();
              }

              closeEndModal();
              onClose(liveEvent);
            }}
            onClose={() => {
              closeEndModal();
            }}
          />
        </EndModal>
        <SettingsModal>
          <Settings liveEvent={liveEvent} onClose={() => {
            closeSettingsModal();
          }}/>
        </SettingsModal>
      </div>
      <RightPanel liveEvent={liveEvent} />
    </div>
  )
}