import { Container, Button, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
const ColorPickerModal = (props) => {
  const { color, setColor, nextAction, cvTemplate, template, setTemplate } =
    props;
  const defaultColor = { r: 165, g: 42, b: 42 };
  const hangleTemplate = (e) => {
    if (e?.target?.checked) setTemplate(e?.target?.id);
  };

  const handleColorChange = (e) => {
    let rgb = e?.rgb;
    setColor({ r: rgb.r, g: rgb.g, b: rgb.b });
  };

  const templates = [
    {
      id: 'placifull',
      label: 'Placifull',
    },
    {
      id: 'simpleGrey',
      label: 'Simple Grey',
    },
    // {
    //   id: 'sunsetGadient',
    //   label: 'Sunset Gradient',
    // },
  ];
  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      centered
      className="color__modal"
    >
      <Modal.Body className="modal__body">
        <SketchPicker
          color={color ? color : defaultColor}
          onChangeComplete={handleColorChange}
          disableAlpha={true}
        />
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <Container>
          {cvTemplate && (
            <Row>
              {templates.map((item) => {
                return (
                  <Col
                    xs={6}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={'checkbox__container'}
                  >
                    <div className={'checkbox__item'}>
                      <label class="checkbox bounce">
                        <input
                          type="checkbox"
                          id={item.id}
                          onClick={hangleTemplate}
                          checked={template && template == item.id}
                        />
                        <svg viewBox="0 0 21 21">
                          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                        </svg>
                      </label>
                    </div>
                    <div className={'text__container '}> {item.label}</div>
                  </Col>
                );
              })}
            </Row>
          )}
          <Row className={'modal__buttons'}>
            <Button onClick={props.onHide}>
              <AiOutlineClose />
            </Button>

            <Button
              onClick={(event) => {
                nextAction(event);
              }}
            >
              <AiOutlineCheck />
            </Button>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ColorPickerModal;
