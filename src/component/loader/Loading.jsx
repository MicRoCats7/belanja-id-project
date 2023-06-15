import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="card-skeleton" key={index}>
        <div className="card-img">
          <Skeleton height={192} />
        </div>
        <div className="bottom-body">
          <Skeleton count={4} />
        </div>
      </div>
    ));
}

export default Loading;
