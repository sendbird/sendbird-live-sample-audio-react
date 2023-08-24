import React from "react";
import IconUser from "../../../assets/svg/icons-user.svg";

interface UserProfileProps {
  profileUrl: string;
  userId: string;
  onClickApplication: () => void;
  onClickSignOut: () => void;
}

// TODO :: complete user profile
export default function UserProfile(props: UserProfileProps) {
  const {
    profileUrl,
    userId,
    onClickApplication,
    onClickSignOut,
  } = props;

  // TODO :: add nickname
  return (
    <div className="user-profile">
      <div className="user-profile__avatar">
        <img src={profileUrl} /> :
        <IconUser fill='#fff' />;
      </div>
      <div className="user-profile__info__wrapper">
        <div className="user-profile__nickname">userId</div>
        <div className="user-profile__user-id">userId</div>
      </div>
      <div className="user-profile__settings"></div>
    </div>
  );
}