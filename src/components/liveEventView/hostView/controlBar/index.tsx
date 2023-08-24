import { LiveEvent, LiveEventState } from "@sendbird/live";
import React, { useContext, useEffect, useState } from "react";
import SettingsIcon from '../../../../assets/svg/icons-settings-filled.svg';
import CameraIcon from '../../../../assets/svg/icons-camera-filled.svg';
import CameraOffIcon from '../../../../assets/svg/icons-camera-off-filled.svg'
import MicIcon from '../../../../assets/svg/icons-mic-filled.svg';
import MicOffIcon from '../../../../assets/svg/icons-mic-off-filled.svg';
import ScreenShareIcon from '../../../../assets/svg/icons-screen-share-filled.svg';
import LayoutIcon from '../../../../assets/svg/icons-layout-filled.svg';

import './index.scss';
import useModal from "../../../../hooks/useModal";
import Settings from "../Settings";
import { SendbirdLiveContext } from "../../../../lib/sendbirdLiveContext";
import ScreenShare from "../ScreenShare";
import Duration from "./Duration";

interface ControlBarProps {
  liveEvent: LiveEvent;
  onStart: (liveEvent: LiveEvent) => void;
  onEnd: (liveEvent: LiveEvent) => void;
  onSettings: (liveEvent: LiveEvent) => void;
}

export default function ControlBar(props: ControlBarProps) {
  const {
    liveEvent,
    onStart,
    onEnd,
    onSettings,
  } = props;

  const [ongoing, setOngoing] = useState(liveEvent.state === LiveEventState.ONGOING);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [SettingsModal, openSettingsModal, closeSettingsModal] = useModal('');
  const [ScreenShareModal, openScreenShareModal, closeScreenShareModal] = useModal('', 'dark-background__screen-share');

  const { stringSet } = useContext(SendbirdLiveContext);

  const startLiveEvent = async () => {
    await liveEvent.startEvent({ turnAudioOn: true, turnVideoOn: true });
    setOngoing(true);
    onStart(liveEvent);
  }

  const toggleVideo = (on: boolean) => {
    on ? liveEvent.startVideo() : liveEvent.stopVideo();
    setVideo(on);
  }

  const toggleAudio = (on: boolean) => {
    on ? liveEvent.unmuteAudioInput() : liveEvent.muteAudioInput();
    setAudio(on);
  }

  const startScreenSharing = async () => {
    await liveEvent.startScreenShare();
    setIsScreenSharing(true);
  }

  const stopScreenSharing = () => {
    liveEvent.stopScreenShare();
    setIsScreenSharing(false);
  }

  return (
    <div className="control-bar">
      <div className="control-bar__left-buttons">
        <div className="control-bar__settings">
          <SettingsIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => onSettings(liveEvent)}/>
        </div>
        <div className="control-bar__video">
          {
            video
              ? <CameraIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => toggleVideo(false) }/>
              : <CameraOffIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => toggleVideo(true) }/>
          }
        </div>
        <div className="control-bar__audio__wrapper">
          <div className="control-bar__audio">
            {
              audio
                ? <MicIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => toggleAudio(false) }/>
                : <MicOffIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => toggleAudio(true) }/>
            }
          </div>
          <div className="control-bar__volume" />
        </div>
        <div className="control-bar__screen-share">
          <ScreenShareIcon width={22} height={22} fill="#ccc" onClick={() => startScreenSharing()}/>
          <LayoutIcon width={22} height={22} fill="#ccc" onClick={() => openScreenShareModal()}/>
          {
            isScreenSharing && <div className="control-bar__screen-share__stop" onClick={() => stopScreenSharing()}>Stop ScreenShare</div>
          }
        </div>
      </div>
      <div className="control-bar__right-buttons">
        {
          ongoing && <div className="participant-icon--red" />
        }
        {
          ongoing && <Duration liveEvent={liveEvent} />
        }
        {
          ongoing
            ? <div className="control-bar__end-live" onClick={() => { onEnd(liveEvent) }}>{stringSet.LIVE_EVENT_END_DIALOG_OPTION_END}</div>
            : <div className="control-bar__start-live" onClick={startLiveEvent}>{stringSet.START_LIVE_EVENT_HEADER_BUTTON}</div>
        }
      </div>
      <ScreenShareModal>
        <ScreenShare liveEvent={liveEvent} onClose={() => {
          closeScreenShareModal();
        }}/>
      </ScreenShareModal>
    </div>
  );
}