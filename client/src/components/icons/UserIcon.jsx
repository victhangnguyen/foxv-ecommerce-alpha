import React from 'react';

const UserIcon = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 574 512"
      fill={color ? color : 'black'}
      width={size ? size : '1rem'}
    >
      <g id="user">
        <path d="M287,512c-70.3,0-126.94-5.15-168.35-15.29-24.72-6.06-43.49-13.75-57.37-23.5C37.91,456.79,33,437.39,33,424c0-67,121.07-128,254-128s254,61,254,128c0,13.39-4.91,32.79-28.28,49.21-13.88,9.75-32.65,17.44-57.37,23.5C413.94,506.85,357.3,512,287,512Zm0-168c-54.54,0-110,11.73-152.16,32.19C95.34,395.37,81,415.29,81,424c0,2.92,2.65,6.26,7.87,9.93,6,4.24,18.09,10.49,41.21,16.16C167.22,459.19,221.48,464,287,464s119.78-4.81,156.92-13.91c23.12-5.67,35.17-11.92,41.21-16.16,5.22-3.67,7.87-7,7.87-9.93,0-8.71-14.34-28.63-53.84-47.81C397,355.73,341.54,344,287,344Z" />
        <path d="M287,248A124,124,0,1,1,411,124,124.15,124.15,0,0,1,287,248Zm0-200a76,76,0,1,0,76,76A76.08,76.08,0,0,0,287,48Z" />
      </g>
    </svg>
  );
};

export default UserIcon;