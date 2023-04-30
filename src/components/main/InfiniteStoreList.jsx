import React from 'react';
import styled from 'styled-components';
import { StoreItem, ScrollObserver } from '../common';
import { StoreItemOnHover, NoResultMessage } from '.';

const StoresContainer = styled.div`
  padding: 20px;
`;

const TopStoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const RestStoresContainer = styled.div`
  margin-top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StoreItemContainer = styled.div`
  overflow: hidden;
  height: 350px;
  background-color: #fff;
  color: #22272e;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 30px;
  position: relative;
  transition: 0.1s ease-in-out;

  border: 2px solid var(--border-secondary);

  :hover {
    scale: 1.02;
  }

  :hover > main {
    transition: 0.1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);

    div {
      display: flex;
    }

    img {
      display: block;
    }
  }
`;

let displayedStores = { topThree: [], remaining: [] };

const InfiniteStoreList = ({ data, fetchNextPage, hasNextPage }) => {
  const searchedStores = data.pages.flat();
  const [topThree, remaining] = [searchedStores.slice(0, 3), searchedStores.slice(3)];

  displayedStores = { topThree, remaining };

  return (
    <>
      {displayedStores.topThree.length ? (
        <StoresContainer>
          <TopStoresContainer>
            {displayedStores.topThree.map(({ storeId, storeName, imgUrl, votesByCategory, address, starCount }) => (
              <StoreItemContainer key={storeId}>
                <StoreItemOnHover storeId={storeId} storeName={storeName} address={address} />
                <StoreItem
                  key={storeId}
                  storeName={storeName}
                  imgUrl={imgUrl}
                  votesByCategory={votesByCategory}
                  starCount={starCount}
                />
              </StoreItemContainer>
            ))}
          </TopStoresContainer>
          <RestStoresContainer>
            {displayedStores.remaining.map(({ storeId, storeName, imgUrl, votesByCategory, starCount }) => (
              <StoreItemContainer key={`${Math.random() * Math.random()}_${storeId}`}>
                <StoreItemOnHover storeId={storeId} />
                <StoreItem
                  storeName={storeName}
                  imgUrl={imgUrl}
                  votesByCategory={votesByCategory}
                  starCount={starCount}
                />
              </StoreItemContainer>
            ))}
          </RestStoresContainer>
          {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
        </StoresContainer>
      ) : (
        <NoResultMessage />
      )}
    </>
  );
};

export default InfiniteStoreList;