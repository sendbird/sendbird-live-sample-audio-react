import React, { useEffect, useState } from "react";
import { LiveEvent, SendbirdLive } from "@sendbird/live";
import { ReactComponent as CloseIcon } from "../../../../assets/svg/icons-close.svg";

import './index.scss';

interface SettingsProps {
  liveEvent: LiveEvent;
  onClose: () => void;
}

export default function Settings(props: SettingsProps) {
  const {
    liveEvent,
    onClose
  } = props;

  const [currentAudioInput, setCurrentAudioInput] = useState<InputDeviceInfo>();
  const [audioInputs, setAudioInputs] = useState<InputDeviceInfo[]>([]);

  const mediaAccess = SendbirdLive.useMedia({ audio: true, video: false });

  useEffect(() => {

    setAudioInputs(SendbirdLive.getAvailableAudioInputDevices());

    setCurrentAudioInput(SendbirdLive.getCurrentAudioInputDevice());

    SendbirdLive.setAudioInputDeviceChanged((current, available) => {
      console.log('audio input updated', available);
      setAudioInputs(available);
      if (current.deviceId !== currentAudioInput?.deviceId) {
        setCurrentAudioInput(current);
      }
    });

    SendbirdLive.updateMediaDevices({ audio: true, video: false });

    return () => {
      if (mediaAccess) mediaAccess.dispose();
    }
  });

  return (
    <div className="settings">
      <div className='close' onClick={() => onClose()}>
        <CloseIcon width={22} height={22} viewBox='0 0 60 60' />
      </div>
      <div className='title'>Settings</div>
      <div className="settings__select-container">
        <div className="settings__select-label">Microphone</div>
        <select
          id="microphone-select"
          value={currentAudioInput?.deviceId}
          className="settings__select-button"
          onChange={e => {
            const { value } = e.target;
            const mediaInfo = audioInputs.find(device => device.deviceId === value);
            if (mediaInfo) liveEvent.selectAudioInput(mediaInfo);
            setCurrentAudioInput(mediaInfo);
          }}
        >
          {audioInputs.map(info => (
            <option key={info.deviceId} value={info.deviceId}>{info.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}