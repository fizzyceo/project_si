import React, { useState } from 'react';

const DeclarerActeD = ({ isvisible, onClose }) => {
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
          <h1 className="text-center font-semibold text-lg">
            Declarer un Acte de Naissance
          </h1>

          <div className="flex flex-col w-full justify-center items-center gap-3">
            <div className="flex items-center grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Votre NSS</label>
              <input
                type="text"
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Votre NSS</label>
              <input
                type="text"
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Votre NSS</label>
              <input
                type="text"
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Cerificat de naissance</label>
              <input
                type="file"
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarerActeD;
