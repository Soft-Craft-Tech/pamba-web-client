import React from "react";

interface RatingIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const RatingIcon: React.FC<RatingIconProps> = ({
  width = 12,
  height = 12,
  fill = "#DB1471",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.208 14.1315L12.0941 16.5771C12.8057 17.0253 13.6735 16.3579 13.4844 15.517L12.4444 10.9023L15.8676 7.78287C16.4926 7.2139 16.1533 6.13869 15.3304 6.07229L10.8138 5.68261L9.03579 1.32411C8.71592 0.532535 7.63142 0.535274 7.31555 1.32845L5.55957 5.68609L1.04497 6.09857C0.222423 6.16913 -0.111427 7.24604 0.516394 7.81184L3.95536 10.914L2.93862 15.5339C2.75376 16.3757 3.62491 17.0387 4.3343 16.5869L8.208 14.1315Z"
        fill={fill}
      />
    </svg>
  );
};

export default RatingIcon;
