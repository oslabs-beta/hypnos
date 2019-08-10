import React, { useState } from 'react';
import Modal from 'react-modal';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const APIModal = () => {
//   const [{ isModalOpen, apiKey, headersKey }, dispatch] = useStateValue();

  const [{ isModalOpen, apiKey, headersKey }, dispatch] = useStateValue();

  const [apiTextValue, setApiTextValue] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  const openModal = () => {
    dispatch({
      type: types.OPEN_MODAL,
    });
  };

  const closeModal = () => {
    console.log('close modal happened');
    dispatch({
      type: types.CLOSE_MODAL,
      apiKey: apiTextValue,
      headerKey: headerValue,
    });
  };

  return (
    <section id="API-key-modal">
      <button onClick={() => openModal()} id="API-button">Authenticate</button>
      <Modal
        isOpen={isModalOpen}
                //   onAfterOpen={this.afterOpenModal}
        onRequestClose={() => closeModal()}
                //   style={customStyles}
        contentLabel="API Key"
      >

        {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
        <form>
          <label>
                        Headers Key:
            <input
              type="text"
              id="headers-key"
              onChange={(e) => {
                const header = e.target.value;
                setHeaderValue(header);
              }}
            />
          </label>
          <label>
                        API Key:
            <input
              type="text"
              id="API-key"
              onChange={(e) => {
                const api = e.target.value;
                setApiTextValue(api);
              }}
            />
          </label>
          <button onClick={() => closeModal()}>Submit</button>
        </form>
      </Modal>
    </section>
  );
};

export default APIModal;
