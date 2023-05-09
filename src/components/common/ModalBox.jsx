import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Modal } from '@mantine/core';
import userState from '../../recoil/atoms/userState';
import themeState from '../../recoil/atoms/themeState';
import { CategorySelector, SameCategoryChecker, SameStoreChecker, SuccessVerifier, ModalButton } from '../modal';
import { Loader } from '.';

const PopupModal = ({ isOpened, setIsOpened, phase, setPhase, storeId, store }) => {
  const theme = useRecoilValue(themeState);
  const [categoryCode, setCategoryCode] = React.useState('none');
  const [taskQueue, setTaskQueue] = React.useState([]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Modal
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
          setPhase('none');
        }}
        transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
        zIndex="9999"
        size="lg"
        centered
        styles={{
          header: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}` },
          body: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}`, paddingTop: '1px !important' },
        }}>
        {phase === 'select' && (
          <CategorySelector
            setIsOpened={setIsOpened}
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store}
            categoryCode={categoryCode}
            setCategoryCode={setCategoryCode}
          />
        )}
        {phase === 'category' && (
          <SameCategoryChecker
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'store' && (
          <SameStoreChecker
            setPhase={setPhase}
            setIsOpened={setIsOpened}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'success' && <SuccessVerifier storeId={storeId} taskQueue={taskQueue} />}
      </Modal>
    </React.Suspense>
  );
};

const ModalBox = ({ store, storeId, width }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = React.useState(false);
  const [phase, setPhase] = React.useState('none');

  if (!user || !isOpened)
    return (
      <ModalButton
        onClick={() => {
          if (!user) {
            navigate('/signin', { state: pathname });
          } else {
            setIsOpened(true);
            setPhase('select');
          }
        }}
        width={width}
      />
    );

  return (
    <PopupModal
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      phase={phase}
      setPhase={setPhase}
      storeId={storeId}
      store={store}
    />
  );
};

export default ModalBox;
