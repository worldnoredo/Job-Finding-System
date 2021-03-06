/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../services/store";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import HTTP from "../../../services/request";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const EmployeeJobDetail: React.FC = () => {
  let { id }: any = useParams();
  const [info, setInfo]: any = useState(null);

  useEffect(() => {
    axios
      .get(HTTP.SERVER + "employer/find/" + id, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => setInfo(data));
  }, [id]);

  // ---
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState([]);

  let handleInvite = (id2: number) => {
    axios
      .post(
        HTTP.SERVER + `employer/job/${id2}/find/${id}/invite`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "ok") {
          toast.success(`🤩 Mời việc ${info ? info.name : ""} thành công!`);
          handleClose();
        } else toast.error("🥱 Mời việc thất bại");
      });
  };

  const getEmployee = () => {
    axios
      .get(HTTP.SERVER + "employer/job", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        setList(data);
      });
  };
  useEffect(() => getEmployee(), []);

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const columns = [
    {
      dataField: "employerJobId",
      text: "ID",
    },
    {
      dataField: "namejob",
      text: "Name",
    },

    {
      dataField: "employerJobId",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        return (
          <Button
            className="btn btn-sm btn-success"
            onClick={() => handleInvite(cellContent)}
          >
            Tuyển dụng
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0" />
        <section className="section mt--300">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../../assets/img/theme/profile.jpg")}
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        onClick={handleShow}
                        size="sm"
                      >
                        Tuyển dụng
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {info ? info.salary + "$" : ""}
                        </span>
                        <span className="description">Lương (/giờ)</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {info ? info.name : ""}
                    <span className="font-weight-light">
                      , {info ? info.age : ""}
                    </span>
                  </h3>

                  <Table responsive>
                    <br />
                    <tbody>
                      <tr>
                        <td>Giới tính</td>
                        <td>{info ? info.sex : ""}</td>
                      </tr>
                      <tr>
                        <td>Công việc</td>
                        <td>{info ? info.job : ""}</td>
                      </tr>
                      <tr>
                        <td>Mô tả</td>
                        <td>{info ? info.jobDetail : ""}</td>
                      </tr>

                      <tr>
                        <td>Thời gian</td>
                        <td>{info ? info.time : ""}</td>
                      </tr>

                      <tr>
                        <td>Lương mong muốn</td>
                        <td>{info ? info.salary + "$ / giờ" : ""}</td>
                      </tr>
                      <tr>
                        <td>Ưu điểm</td>
                        <td>{info ? info.talent : ""}</td>
                      </tr>
                      <tr>
                        <td>Khu vực</td>
                        <td>{info ? info.area : ""}</td>
                      </tr>
                      <tr>
                        <td>Địa chỉ</td>
                        <td>{info ? info.address : ""}</td>
                      </tr>
                      <tr>
                        <td>Điện thoại</td>
                        <td>{info ? info.phone : ""}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{info ? info.email : ""}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className=" py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        Đừng bao giờ sợ thất bại. Bạn chỉ cần đúng có một lần
                        trong đời thôi.
                      </p>
                      <a
                        href="#showMore"
                        onClick={(e: any) =>
                          toast.info("😁😁😁 Không có gì ở đây hết", {
                            position: "bottom-right",
                          })
                        }
                      >
                        Show more
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        id="resultModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Which job?</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-center">
          {list.length > 0 ? (
            <>
              <h2>
                Bạn muốn tuyển dụng {info ? info.name : ""} vào công việc nào?
              </h2>
              <br />
              <br />
              <BootstrapTable
                keyField="id"
                id="table"
                data={list}
                columns={columns}
                pagination={paginationFactory(options)}
              />
            </>
          ) : (
            <>
              <h2>Bạn chưa tạo việc làm nào!</h2>
              <br />
              <br />
              <Button href="/employer/create" className="btn-success">
                Tạo việc làm
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeJobDetail;
