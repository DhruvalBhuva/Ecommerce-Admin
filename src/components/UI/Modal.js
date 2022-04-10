// Used inside category and product as bootstrap model
import React from "react";
import { Modal, Button } from "react-bootstrap";

export const Modals = (props) => {
  return (
    //  from React Bootstrap (Model)
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <div style={{ padding: "20px" }}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modelTitle}</Modal.Title>
        </Modal.Header>
        {props.children}
        <Modal.Footer>
          {props.buttons ? (
            props.buttons.map((btn, index) => (
              <Button key={index} variant={btn.color} onClick={btn.onclick}>
                {btn.label}
              </Button>
            ))
          ) : (
            <Button
              variant="primary"
              {...props}
              className="btn-sm"
              onClick={props.onSubmit}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default Modals;
