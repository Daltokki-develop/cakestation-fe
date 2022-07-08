import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Input from './common/input/input';

const UpdateReviewContainer = styled.div`
  padding: 2rem 0;
`;

const StyledLabel = styled.div`
  margin-top: 1rem;
  width: 3rem;

  :last-child {
    margin-bottom: 1rem;
  }
`;

interface AddStudentModalProps {
  onCloseModal: any;
  initialData: any;
  // any props that come into the component
}

const AddStudentModal = ({
  onCloseModal,
  initialData,
}: AddStudentModalProps) => {
  const [name, setName] = useState<any>();
  const [content, setContent] = useState<any>();

  useEffect(() => {
    setContent(initialData?.content);
    setName(initialData?.name);
  }, []);

  const handleCancel = () => {
    onCloseModal(null);
  };

  const handleSave = () => {
    onCloseModal({
      name,
      content,
      id: initialData?.id,
    });
  };

  return (
    <UpdateReviewContainer>
      <strong>간단 리뷰 등록</strong>
      <div>
        <StyledLabel>Name</StyledLabel>
        <Input
          value={name || ''}
          onChange={(e: any) => setName(e.target.value)}
          placeholder={'이름을 입력해주세요.'}
        />
      </div>

      <div>
        <StyledLabel>Review</StyledLabel>
        <Input
          value={content || ''}
          onChange={(e: any) => setContent(e.target.value)}
          placeholder={'리뷰를 입력해주세요.'}
        />
      </div>
      <p>
        <button className="mr-2" onClick={handleSave}>
          확인
        </button>
        <button onClick={handleCancel}>취소</button>
      </p>
    </UpdateReviewContainer>
  );
};

export default AddStudentModal;
