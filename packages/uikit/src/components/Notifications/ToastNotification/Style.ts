import styled from "styled-components";

export const Progress = styled.div`
  border-radius: ${(p) => p.theme.borderRadius} 0 0
    ${(p) => p.theme.borderRadius};
  position: relative;
  display: flex;
  align-self: stretch;
  background: #000;
  width: 5px;
`;
export const Close = styled.div`
  cursor: pointer;
  opacity: 0.5;
  padding: 0 0.5rem 0 0;
  transition: 0.25s all;
  margin-left: auto;
  &:hover {
    opacity: 1;
  }
`;
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  position: relative;

  text-align: center;
  padding: 0.5rem;
`;
export const Content = styled.div`
  line-height: 1.2rem;
  padding: 0.5rem 0;
  a {
    color: #fff;
  }
`;
export const NotificationWrapper = styled.div`
  @keyframes slideDown {
    from {
      height: 100%;
    }
    to {
      height: 0%;
    }
  }
  background: ${(props) => props.theme.bgAlt};
  color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;

  width: 22rem;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 0.75rem;
  align-items: center;
  min-height: 60px;

  &.warning {
    > ${Progress} {
      background: ${(props) => props.theme.warning};
    }
    > ${Icon} {
      color: ${(props) => props.theme.warning};
    }
    > ${Content} {
      b,
      a:hover {
        color: ${(props) => props.theme.warning};
      }
    }
  }

  &.error {
    > ${Progress} {
      background: ${(props) => props.theme.danger};
    }
    > ${Icon} {
      color: ${(props) => props.theme.danger};
    }
    > ${Content} {
      b,
      a:hover {
        color: ${(props) => props.theme.danger};
      }
    }
  }

  &.info {
    > ${Progress} {
      background: ${(props) => props.theme.info};
    }
    > ${Icon} {
      color: ${(props) => props.theme.info};
    }
    > ${Content} {
      b,
      a:hover {
        color: ${(props) => props.theme.info};
      }
    }
  }

  &.success {
    > ${Progress} {
      background: ${(props) => props.theme.success};
    }
    > ${Icon} {
      color: ${(props) => props.theme.success};
    }
    > ${Content} {
      b,
      a:hover {
        color: ${(props) => props.theme.success};
      }
    }
  }
`;

export const Countdown = styled.div<{ duration?: number }>`
  animation-name: slideDown;
  animation-duration: ${(p) => (p.duration ? p.duration : 0)}ms;
  animation-play-state: running;
  animation-iteration-count: 1;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
`;
