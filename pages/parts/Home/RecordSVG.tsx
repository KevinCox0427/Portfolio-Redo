import React, { FunctionComponent } from "react";

type Props = {
    color: string
}

const RecordSVG:FunctionComponent<Props> = (props) => {
    return <svg className="RecordSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 858.48 858.48">
        <circle fill="#000000" cx="429.24" cy="429.24" r="429.24"/>
        <path fill="#222222" d="m429.24,827.74c-53.8,0-105.99-10.54-155.12-31.32-47.45-20.07-90.07-48.8-126.67-85.4-36.6-36.6-65.33-79.21-85.4-126.67-20.78-49.13-31.32-101.32-31.32-155.11s10.54-105.98,31.32-155.11c20.07-47.45,48.8-90.07,85.4-126.67,36.6-36.6,79.21-65.33,126.67-85.4,49.13-20.78,101.32-31.32,155.12-31.32s105.98,10.54,155.11,31.32c47.45,20.07,90.07,48.8,126.67,85.4,36.6,36.6,65.33,79.21,85.4,126.67,20.78,49.13,31.32,101.32,31.32,155.11,0,53.8-10.54,105.98-31.32,155.11-20.07,47.45-48.8,90.07-85.4,126.67-36.6,36.6-79.21,65.33-126.67,85.4-49.13,20.78-101.32,31.32-155.11,31.32Zm0-794c-53.39,0-105.19,10.46-153.95,31.08-47.1,19.92-89.39,48.44-125.71,84.76-36.32,36.32-64.84,78.62-84.76,125.71-20.62,48.76-31.08,100.55-31.08,153.95,0,53.39,10.46,105.19,31.08,153.95,19.92,47.1,48.44,89.39,84.76,125.71,36.32,36.32,78.62,64.84,125.71,84.76,48.76,20.62,100.55,31.08,153.95,31.08,53.39,0,105.19-10.46,153.95-31.08,47.1-19.92,89.39-48.44,125.71-84.76,36.32-36.32,64.84-78.62,84.76-125.71,20.62-48.76,31.08-100.55,31.08-153.95,0-53.39-10.46-105.19-31.08-153.95-19.92-47.1-48.44-89.39-84.76-125.71-36.32-36.32-78.62-64.84-125.71-84.76-48.76-20.62-100.55-31.08-153.95-31.08Zm0,770.61c-50.64,0-99.76-9.92-146.01-29.48-44.67-18.89-84.78-45.94-119.23-80.39-34.45-34.45-61.5-74.56-80.39-119.23-19.56-46.25-29.48-95.37-29.48-146.01,0-50.64,9.92-99.76,29.48-146.01,18.89-44.67,45.94-84.78,80.39-119.23,34.45-34.45,74.57-61.5,119.23-80.39,46.25-19.56,95.37-29.48,146.01-29.48,50.64,0,99.76,9.92,146.01,29.48,44.67,18.89,84.78,45.94,119.23,80.39,34.45,34.45,61.5,74.56,80.39,119.23,19.56,46.25,29.48,95.37,29.48,146.01,0,50.64-9.92,99.76-29.48,146.01-18.89,44.67-45.94,84.78-80.39,119.23-34.45,34.45-74.56,61.5-119.23,80.39-46.25,19.56-95.37,29.48-146.01,29.48Zm0-746.89c-50.19,0-98.88,9.83-144.71,29.22-44.27,18.72-84.03,45.53-118.17,79.68-34.14,34.14-60.95,73.9-79.68,118.17-19.39,45.83-29.21,94.52-29.21,144.71,0,50.19,9.83,98.88,29.21,144.71,18.73,44.27,45.53,84.03,79.68,118.17,34.14,34.14,73.9,60.95,118.17,79.68,45.83,19.39,94.52,29.22,144.71,29.22s98.88-9.83,144.71-29.22c44.27-18.72,84.03-45.53,118.17-79.68,34.14-34.14,60.95-73.9,79.68-118.17,19.39-45.83,29.21-94.52,29.21-144.71,0-50.19-9.83-98.88-29.21-144.71-18.73-44.27-45.53-84.03-79.68-118.17-34.14-34.14-73.9-60.95-118.17-79.68-45.83-19.39-94.52-29.22-144.71-29.22Zm0,723.5c-47.48,0-93.54-9.3-136.91-27.64-41.88-17.71-79.5-43.08-111.8-75.38-32.3-32.3-57.66-69.92-75.38-111.8-18.34-43.36-27.64-89.43-27.64-136.91,0-47.48,9.3-93.54,27.64-136.91,17.71-41.88,43.08-79.5,75.38-111.8,32.3-32.3,69.92-57.66,111.8-75.38,43.36-18.34,89.43-27.64,136.91-27.64,47.48,0,93.54,9.3,136.91,27.64,41.88,17.71,79.5,43.08,111.8,75.38,32.3,32.3,57.66,69.92,75.38,111.8,18.34,43.36,27.64,89.43,27.64,136.91s-9.3,93.54-27.64,136.91c-17.71,41.88-43.08,79.5-75.38,111.8-32.3,32.3-69.92,57.66-111.8,75.38-43.36,18.34-89.42,27.64-136.91,27.64Zm0-699.78c-92.97,0-180.37,36.2-246.11,101.94-65.74,65.74-101.94,153.14-101.94,246.11,0,92.97,36.2,180.37,101.94,246.11,65.74,65.74,153.14,101.94,246.11,101.94,92.97,0,180.37-36.2,246.11-101.94s101.94-153.14,101.94-246.11c0-92.97-36.2-180.37-101.94-246.11-65.74-65.74-153.14-101.94-246.11-101.94Zm0,676.39c-87.7,0-170.15-34.15-232.17-96.17-62.01-62.01-96.17-144.47-96.17-232.17,0-87.7,34.15-170.15,96.17-232.17,62.01-62.01,144.47-96.17,232.17-96.17,87.7,0,170.15,34.15,232.17,96.17,62.01,62.01,96.17,144.47,96.17,232.17,0,87.7-34.15,170.15-96.17,232.17-62.01,62.01-144.46,96.17-232.17,96.17Zm0-652.67c-86.63,0-168.08,33.74-229.34,95-61.26,61.26-95,142.71-95,229.34,0,86.63,33.74,168.08,95,229.34,61.26,61.26,142.71,95,229.34,95,86.63,0,168.08-33.74,229.34-95,61.26-61.26,95-142.71,95-229.34,0-86.63-33.74-168.08-95-229.34-61.26-61.26-142.71-95-229.34-95Zm0,629.28c-81.45,0-158.03-31.72-215.63-89.32-57.6-57.6-89.32-134.17-89.32-215.63,0-81.45,31.72-158.03,89.32-215.63,57.6-57.6,134.17-89.32,215.63-89.32,81.45,0,158.03,31.72,215.63,89.32,57.6,57.6,89.32,134.17,89.32,215.63s-31.72,158.03-89.32,215.63c-57.6,57.6-134.17,89.32-215.63,89.32Zm0-605.56c-80.3,0-155.79,31.27-212.56,88.05-56.78,56.78-88.05,132.27-88.05,212.56,0,80.3,31.27,155.79,88.05,212.56,56.78,56.78,132.27,88.05,212.56,88.05,80.3,0,155.79-31.27,212.56-88.05,56.78-56.78,88.05-132.27,88.05-212.56,0-80.3-31.27-155.79-88.05-212.56-56.78-56.78-132.27-88.05-212.56-88.05Zm0,582.17c-75.21,0-145.91-29.29-199.09-82.47-53.18-53.18-82.47-123.88-82.47-199.09,0-75.21,29.29-145.91,82.46-199.09,53.18-53.18,123.88-82.47,199.09-82.47s145.91,29.29,199.09,82.47c53.18,53.18,82.46,123.88,82.46,199.09,0,75.21-29.29,145.91-82.46,199.09-53.18,53.18-123.88,82.47-199.09,82.47Zm0-558.44c-73.96,0-143.49,28.8-195.79,81.1-52.3,52.3-81.1,121.83-81.1,195.79,0,73.96,28.8,143.49,81.1,195.79,52.3,52.3,121.83,81.1,195.79,81.1s143.49-28.8,195.79-81.1c52.3-52.3,81.1-121.83,81.1-195.79,0-73.96-28.8-143.49-81.1-195.79-52.3-52.3-121.83-81.1-195.79-81.1Zm0,535.06c-68.96,0-133.79-26.85-182.55-75.62-48.76-48.76-75.62-113.59-75.62-182.55,0-68.96,26.85-133.79,75.62-182.55,48.76-48.76,113.59-75.62,182.55-75.62,68.96,0,133.79,26.85,182.55,75.62,48.76,48.76,75.62,113.59,75.62,182.55,0,68.96-26.85,133.79-75.62,182.55-48.76,48.76-113.59,75.62-182.55,75.62Zm0-511.33c-67.62,0-131.2,26.33-179.02,74.15-47.82,47.82-74.15,111.39-74.15,179.02,0,67.62,26.33,131.2,74.15,179.02,47.82,47.82,111.39,74.15,179.02,74.15,67.62,0,131.2-26.33,179.02-74.15,47.82-47.82,74.15-111.39,74.15-179.02,0-67.62-26.33-131.2-74.15-179.02-47.82-47.82-111.39-74.15-179.02-74.15Zm0,487.94c-62.71,0-121.67-24.42-166.01-68.76-44.34-44.34-68.77-103.3-68.77-166.01s24.42-121.67,68.77-166.01c44.34-44.34,103.3-68.76,166.01-68.76,62.71,0,121.67,24.42,166.01,68.76s68.76,103.3,68.76,166.01c0,62.71-24.42,121.67-68.76,166.01-44.34,44.34-103.3,68.76-166.01,68.76Zm0-464.22c-61.29,0-118.91,23.87-162.24,67.2-43.34,43.34-67.2,100.96-67.2,162.24s23.87,118.91,67.2,162.24c43.34,43.34,100.96,67.2,162.24,67.2s118.91-23.87,162.24-67.2c43.34-43.34,67.2-100.95,67.2-162.24,0-61.29-23.87-118.91-67.2-162.24-43.34-43.34-100.95-67.2-162.24-67.2Zm0,440.83c-116.56,0-211.39-94.83-211.39-211.39,0-116.56,94.83-211.39,211.39-211.39,116.56,0,211.39,94.83,211.39,211.39,0,116.56-94.83,211.39-211.39,211.39Zm0-417.11c-113.44,0-205.72,92.29-205.72,205.72,0,113.44,92.29,205.72,205.72,205.72,113.44,0,205.72-92.29,205.72-205.72,0-113.44-92.29-205.72-205.72-205.72Zm0,393.72c-103.66,0-188-84.34-188-188,0-103.66,84.34-188,188-188,103.66,0,188,84.34,188,188s-84.34,188-188,188Zm0-370c-100.36,0-182,81.64-182,182s81.64,182,182,182c100.36,0,182-81.64,182-182s-81.64-182-182-182Z"/>
        <path fill="#47484d" d="m429.24,664.02c-27.19,0-53.67-4.6-78.56-13.41l1.79-5.03c24.33,8.61,50.2,13.11,76.78,13.11,26.55,0,52.41-4.49,76.71-13.09l1.79,5.03c-24.88,8.8-51.33,13.39-78.5,13.39Zm94.17,30.71l-1.56-4.4c-29.34,10.38-60.56,15.8-92.61,15.8-32.08,0-63.32-5.43-92.68-15.83l-1.56,4.4c29.86,10.58,61.63,16.09,94.25,16.09,32.59,0,64.33-5.51,94.17-16.07Zm-181.06-508.73l1.68,4.71c26.99-9.62,55.71-14.63,85.21-14.63,29.47,0,58.18,5.01,85.15,14.61l1.67-4.71c-27.5-9.79-56.77-14.9-86.82-14.9-30.08,0-59.37,5.11-86.89,14.92Zm173.23,486.68l-1.68-4.71c-26.83,9.49-55.36,14.44-84.66,14.44-29.32,0-57.88-4.96-84.73-14.47l-1.68,4.71c27.38,9.7,56.5,14.75,86.4,14.75,29.88,0,58.98-5.05,86.34-14.73Zm-181.07-508.73l1.56,4.4c29.51-10.51,60.92-15.99,93.17-15.99,32.23,0,63.61,5.47,93.09,15.97l1.56-4.4c-29.98-10.67-61.89-16.24-94.66-16.24-32.79,0-64.73,5.57-94.73,16.26Zm15.68,44.1l1.79,5.03c24.47-8.73,50.51-13.27,77.26-13.27,26.72,0,52.75,4.54,77.2,13.25l1.79-5.03c-25.02-8.91-51.64-13.56-78.99-13.56-27.37,0-54.02,4.65-79.05,13.58Zm15.71,44.19l2.01,5.65c19.17-6.88,39.82-10.64,61.32-10.64,21.49,0,42.12,3.75,61.28,10.62l2.01-5.65c-19.79-7.09-41.09-10.97-63.28-10.97-22.21,0-43.54,3.88-63.34,10.99Zm133.97,376.25l-1.9-5.34c-21.5,7.65-44.64,11.82-68.73,11.82-24.12,0-47.27-4.18-68.79-11.84l-1.9,5.34c22.11,7.87,45.91,12.17,70.69,12.17,24.76,0,48.53-4.29,70.63-12.15Zm-7.83-22.04l-2.01-5.65c-19.02,6.76-39.48,10.45-60.79,10.45-21.33,0-41.81-3.7-60.84-10.47l-2.01,5.65c19.66,7,40.82,10.82,62.85,10.82,22.01,0,43.15-3.82,62.8-10.8Zm-133.97-376.25l1.9,5.34c21.66-7.77,44.98-12.01,69.27-12.01,24.28,0,47.58,4.24,69.22,11.99l1.9-5.34c-22.23-7.97-46.17-12.32-71.12-12.32-24.96,0-48.92,4.36-71.17,12.34ZM429.24,30.74c-46.12,0-91.05,7.77-133.9,23.07l1,2.83c42.52-15.19,87.12-22.9,132.89-22.9,45.74,0,90.3,7.68,132.79,22.85l1-2.83c-42.81-15.28-87.71-23.02-133.8-23.02Zm117.64,730.05l-1.2-3.37c-36.9,13.06-76.15,19.88-116.45,19.88-40.33,0-79.61-6.82-116.54-19.91l-1.2,3.37c37.68,13.4,77.19,20.21,117.74,20.21,40.52,0,79.99-6.8,117.64-20.18ZM303.18,75.86l1.12,3.14c39.98-14.28,81.9-21.53,124.94-21.53,43,0,84.9,7.22,124.85,21.48l1.12-3.14c-40.31-14.39-82.58-21.68-125.97-21.68-43.42,0-85.72,7.32-126.06,21.73Zm251.53,706.97l-1.12-3.14c-39.8,14.15-81.53,21.33-124.36,21.33-42.87,0-84.63-7.18-124.46-21.35l-1.12,3.14c40.19,14.3,82.33,21.54,125.58,21.54,43.21,0,85.32-7.25,125.48-21.52Zm-125.48,44.91c45.91,0,90.64-7.7,133.31-22.87l-1-2.83c-42.34,15.05-86.74,22.69-132.3,22.69-45.6,0-90.04-7.63-132.41-22.71l-1.01,2.83c42.7,15.19,87.47,22.88,133.42,22.88ZM318.83,119.85l1.34,3.77c34.55-12.3,71.32-18.71,109.07-18.71,37.73,0,74.47,6.4,108.99,18.68l1.34-3.77c-34.94-12.43-72.14-18.91-110.33-18.91-38.22,0-75.44,6.49-110.41,18.94Zm212.42,596.93l-1.45-4.08c-31.86,11.28-65.75,17.16-100.55,17.16-34.83,0-68.75-5.89-100.63-17.19l-1.45,4.08c32.35,11.46,66.75,17.44,102.09,17.44,35.3,0,69.68-5.97,102.01-17.41ZM326.67,141.9l1.45,4.08c32.03-11.41,66.12-17.35,101.12-17.35,34.98,0,69.04,5.94,101.04,17.33l1.45-4.08c-32.46-11.55-67.01-17.58-102.49-17.57-35.51,0-70.09,6.03-102.57,17.6Zm-15.65-44l1.2,3.36c37.06-13.2,76.52-20.07,117.02-20.07,40.48,0,79.89,6.87,116.93,20.04l1.2-3.36c-37.8-13.5-77.44-20.35-118.13-20.35-40.72,0-80.39,6.86-118.22,20.38Zm228.06,640.93l-1.34-3.77c-34.38,12.17-70.95,18.52-108.5,18.52-37.58,0-74.18-6.36-108.59-18.55l-1.34,3.77c34.83,12.34,71.88,18.78,109.93,18.78,38.01,0,75.04-6.43,109.84-18.75Z"/>
        <path fill={`var(--${props.color})`} d="m429.24,276.87c-84.15,0-152.37,68.22-152.37,152.37,0,84.15,68.22,152.37,152.37,152.37,84.15,0,152.37-68.22,152.37-152.37,0-84.15-68.22-152.37-152.37-152.37Zm0,201.17c-26.96,0-48.81-21.85-48.81-48.81,0-26.96,21.85-48.81,48.81-48.81,26.96,0,48.81,21.85,48.81,48.81,0,26.96-21.85,48.81-48.81,48.81Z"/>
    </svg>
}

export default RecordSVG;