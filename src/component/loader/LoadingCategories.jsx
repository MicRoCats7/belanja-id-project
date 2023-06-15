import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="card-skeleton" key={index}>
        <div className="card-img-categories">
          <Skeleton height={60} width={60} />
        </div>
        <div className="bottom-body">
          <Skeleton count={1} height={20} />
        </div>
      </div>
    ));
}

export default Loading;
