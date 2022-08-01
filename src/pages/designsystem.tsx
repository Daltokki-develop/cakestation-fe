import React from 'react';

import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import ItemCard from '@/components/common/itemcard';
import Modal from '@/components/common/modal';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const DesignSystem = () => {
  // const router = useRouter();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const sizeArr = ['large', 'medium', 'small'];
  const buttonCategory = ['primary', 'secondary'];
  const typoCategory = [
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'Bd1',
    'Bd2',
    'Bd3',
    'Bd4',
    'Bd5',
    'Bd6',
    'Bd7',
    'Bd8',
    'Bd9',
    'Bd10',
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Main
      meta={
        <Meta
          title="Cakestation FE"
          description="Cakestation FE 진행 상황 공유"
        />
      }
    >
      <div>
        <h1 className="text-2xl font-bold">Cakestation Design System</h1>
        <div>
          <p>🚀 BUTTON & Modal</p>
          {sizeArr.map((size, index1) =>
            buttonCategory.map((category, index2) => (
              <Button
                key={index1.toString() + index2.toString()}
                size={size}
                category={category}
                disabled={false}
                onClick={openModal}
              >
                사이즈 : {size}, 타입 : {category}
              </Button>
            ))
          )}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={() => {}}
            onRequestClose={closeModal}
            type={1}
            title={'타이틀'}
            text={'모달'}
            notice={'노티스'}
            buttons={['확인']}
          />
        </div>
        <div>
          <p>⚡️ INPUT</p>
          <Input placeholder={'내용을 입력하세요.'} onChange={() => {}} />
        </div>
        <div>
          <p>🔥 INPUT TOGGLE</p>
          <InputToggle
            options={['첫번째 옵션', '두번째 옵션', '세번째 옵션']}
          />
        </div>
        <div>
          <p>👑 Divider</p>
          {sizeArr.map((size, index) => (
            <Divider key={index} size={size} />
          ))}
        </div>
        <div>
          <p>🎈 Tag</p>
          {sizeArr.map((size, index) => (
            <div key={index}>
              <Tag size={size} icon={false}>
                텍스트
              </Tag>
              <Tag
                size={size}
                icon={true}
                src={'/assets/images/icons/rate_filled.svg'}
              >
                텍스트
              </Tag>
            </div>
          ))}
        </div>
        <div>
          <p>📑 Typography</p>
          {typoCategory.map((category, index) => (
            <Typography key={index} category={category}>
              {category}
            </Typography>
          ))}
        </div>
        <div>
          <p>🎫 ItemCard</p>
          <ItemCard
            line
            title={'달토끼 케이크'}
            rate={'4.5'}
            count={10}
            distance={'역에서 123m'}
            pictures={[
              'test-cakestore.png',
              'test-cakestore.png',
              'test-cakestore.png',
            ]}
          />
        </div>
      </div>
    </Main>
  );
};

export default DesignSystem;
