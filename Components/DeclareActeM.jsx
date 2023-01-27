import React, { useState } from 'react';

const DeclarerActeM = ({ isvisible, onClose }) => {
  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };
  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[500px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center">Share Your Linktree...</h1>
          <div className="border-2 border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer p-3 flex flex-row gap-3 items-center justify-between">
            <div></div>

            <p className="text-indigo-800 font-semibold">Copied</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarerActeM;
