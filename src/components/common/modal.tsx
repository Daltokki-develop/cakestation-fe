import React from 'react';
import type { OnAfterOpenCallback } from 'react-modal';
import Modal from 'react-modal';
import styled from 'styled-components';

import palette from '@/styles/palette';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',

    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  font-family: 'Pretendard-Regular';
`;

const ModalTitle = styled.span`
  color: ${palette.grey_800};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ModalText = styled.div`
  color: ${palette.grey_600};
  font-size: 14px;
  font-weight: 400;
`;

const ModalNotice = styled.div`
  margin-top: 16px;
  color: ${palette.grey_500};
  font-size: 14px;
  font-weight: 400;
`;

const ModalButtons = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
`;

const ModalButton = styled.div<IModalButtonProps>`
  flex: 1;
  height: 100%;
  background-color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.hasBg
      ? props.type === 1
        ? palette.cakeLemon_500
        : palette.red_500
      : palette.grey_300};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) =>
    props.hasBg && props.type === 2 ? palette.white : palette.grey_800};
  font-size: 16px;
  font-weight: 400;
`;

interface IStyledModalProps {
  isOpen: boolean;
  onAfterOpen: OnAfterOpenCallback | undefined;
  onRequestClose: (() => void) | undefined;
  contentLabel?: string;
  type: number;
  title: string;
  text: string;
  notice?: string;
  buttons: any[];
}

interface IModalButtonProps {
  type: number;
  hasBg?: boolean;
}

const StyledModal = (props: IStyledModalProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      <ModalContent>
        <ModalTitle>{props.title}</ModalTitle>
        <ModalText>{props.text}</ModalText>
        {props.notice && <ModalNotice>※ {props.notice}</ModalNotice>}
      </ModalContent>
      <ModalButtons>
        {props.buttons.map((button, index) => (
          <ModalButton
            key={index}
            type={props.type}
            hasBg={index === props.buttons.length - 1}
          >
            {button}
          </ModalButton>
        ))}
      </ModalButtons>
    </Modal>
  );
};

export default StyledModal;
