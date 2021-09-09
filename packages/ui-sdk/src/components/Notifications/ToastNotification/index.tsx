import React from 'react';

import { VscClose } from 'react-icons/vsc';
import {
  HiOutlineCheckCircle as SuccessIcon,
  HiOutlineXCircle as ErrorIcon,
  HiOutlineInformationCircle as InfoIcon,
  HiOutlineExclamationCircle as WarningIcon,
} from 'react-icons/hi';
import { IconType } from 'react-icons';
import { Countdown, NotificationWrapper, Progress, Icon, Content, Close } from './Style';

type Appearance = 'error' | 'info' | 'success' | 'warning';

const apparanceIconMap: Record<Appearance, IconType> = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

interface ToastNotificationProps {
  onDismiss?: () => void;
  appearance: Appearance;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  onDismiss = () => {},
  appearance = 'info',
  children,
}) => {
  const TheIcon = apparanceIconMap[appearance];

  return (
    <NotificationWrapper className={appearance}>
      <Progress>
        <Countdown />
      </Progress>
      <Icon>
        <TheIcon size={25} />
      </Icon>
      <Content>
        <div>{children}</div>
      </Content>
      <Close onClick={() => onDismiss()}>
        <VscClose size={25} />
      </Close>
    </NotificationWrapper>
  );
};