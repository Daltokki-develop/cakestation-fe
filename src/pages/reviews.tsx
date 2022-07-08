import React, { useState } from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

// import { useHistory } from 'react-router';
import AddStudentModal from '../components/AddReviewModal';
import { useReviewStore } from '../store';

const NameSpan = styled.span`
  font-family: 'Pretendard-Bold';
  color: ${palette.cakeLavender_600};
  margin-right: 1rem;
`;

const ButtonGroupDiv = styled.div`
  margin-left: 2rem;
  display: flex;
  align-items: center;

  .del {
    color: ${palette.orange_400};
  }

  .edit {
    color: ${palette.blue_300};
  }

  button {
    margin-left: 1rem;
  }
`;

const Reviews = () => {
  // const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const reviews = useReviewStore((state: any) => state.reviews);
  const addReview = useReviewStore((state: any) => state.addReview);
  const removeReview = useReviewStore((state: any) => state.removeReview);
  const updateReview = useReviewStore((state: any) => state.updateReview);

  console.log(reviews);

  const handleModalClose = (response: any) => {
    setModalOpen(false);
    if (response) {
      console.log(response, modalOpen);
      if (response.id) {
        updateReview({
          name: response.name,
          content: response.content,
          id: response.id,
        });
      } else {
        addReview({ name: response.name, content: response.content });
      }
    }
    return modalData && setModalData(null);
  };

  const handleDelete = (id: any) => {
    removeReview(id);
  };

  const editItem = (item: any) => {
    setModalData(item);
    setModalOpen(true);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <div>
        <div>
          <div>
            <AddStudentModal
              onCloseModal={handleModalClose}
              initialData={modalData}
            />
          </div>
          <Divider size={'full'} />
          <div>
            {reviews.map((item: any) => (
              <div className="flex" key={item.id}>
                <label>
                  <p>
                    <NameSpan>{item.name}</NameSpan>
                    {item.content}
                  </p>
                </label>
                <ButtonGroupDiv>
                  <button className="del" onClick={() => handleDelete(item.id)}>
                    삭줴
                  </button>
                  <button className="edit" onClick={() => editItem(item)}>
                    편쥡
                  </button>
                </ButtonGroupDiv>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default React.memo(Reviews);
