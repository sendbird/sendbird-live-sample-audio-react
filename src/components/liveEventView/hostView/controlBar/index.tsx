import { LiveEvent, LiveEventState } from "@sendbird/live";
import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as SettingsIcon } from '../../../../assets/svg/icons-settings-filled.svg';
import { ReactComponent as MicIcon } from '../../../../assets/svg/icons-mic-filled.svg';
import { ReactComponent as MicOffIcon } from '../../../../assets/svg/icons-mic-off-filled.svg';

import './index.scss';
import { SendbirdLiveContext } from "../../../../lib/sendbirdLiveContext";
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

  const { stringSet } = useContext(SendbirdLiveContext);

  const startLiveEvent = async () => {
    await liveEvent.startEvent({ turnAudioOn: true, turnVideoOn: false });
    setOngoing(true);
    onStart(liveEvent);
  }

  const toggleAudio = (on: boolean) => {
    on ? liveEvent.unmuteAudioInput() : liveEvent.muteAudioInput();
    setAudio(on);
  }

  return (
    <div className="control-bar">
      <div className="control-bar__left-buttons">
        <div className="control-bar__settings">
          <SettingsIcon viewBox="0 0 64 64" width={22} height={22} fill="#ccc" onClick={() => onSettings(liveEvent)}/>
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
    </div>
  );
}