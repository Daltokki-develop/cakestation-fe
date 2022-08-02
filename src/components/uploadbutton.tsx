import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}

export const UploadButton: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  const StyledUploadButton = styled.div`
    width: 292px;
    height: 292px;
    background-color: ${palette.grey_100};

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    .innerbox {
      width: 170px;
      height: 160px;
      background-color: ${palette.grey_300};

      position: relative;

      transition: all 0.2s ease-in-out;
    }

    .innerbox::before {
      content: '';
      position: absolute;
      top: 63px;
      left: 83.73px;
      width: 4.55px;
      height: 36px;
      background-color: ${palette.white};
    }

    .innerbox::after {
      content: '';
      position: absolute;
      top: 78.733px;
      left: 68px;
      width: 36px;
      height: 4.55px;
      background-color: ${palette.white};
    }

    &:hover {
      background-color: ${palette.grey_200};

      .innerbox {
        background-color: ${palette.grey_400};
      }
    }
  `;

  return (
    <form ref={formRef}>
      <StyledUploadButton onClick={onClickHandler}>
        <div className="innerbox" />
      </StyledUploadButton>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </form>
  );
};

UploadButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};
