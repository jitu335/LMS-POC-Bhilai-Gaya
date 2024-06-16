import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ResourceModal from "../../components/ResourceModal";
import { MdEdit, MdDelete } from "react-icons/md";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import PaginationTabs from "../../components/Pagination";
import DeleteModal from "../../components/DeleteModal";

export default function OpsResources() {
  const [search, setSearch] = useState("");
  const [showAddResources, setShowAddResources] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editResData, setEditResData] = useState({
    title: "",
    link: "",
    description: "",
  });
  const [resourceList, setResourceList] = useState([]);
  const [query, setQuery] = useState({
    totalPages: 0,
    currentPage: 1,
    pages: [],
    
    perPage: 5,
  });
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [id, setId] = useState();

  const HideAddResources = () => {
    setShowAddResources(false);
    setIsEdit(false);
    setEditResData({ title: "", link: "", description: "" });
  };

  const showDeleteModal = (id) => {
    setId(id);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const handleDelete = (id) => {
    setDisplayConfirmationModal(false);
    deleteResources(id)
  }

  async function deleteResources(id) {
    await API.delete(`program/api/program/opsresource/` + id + `/`)
      .then((response) => {
        fetchPosts();
        HideAddResources();
        toast.success("Ops Resources Deleted Successfully!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const editResources = (data) => {
    setIsEdit(true);
    setEditResData(data);
    setShowAddResources(true);
  };

  async function fetchPosts() {
    await API.get(`program/api/program/opsresource/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
      }&page_size=${query?.perPage}${search ? `&search=${search}` : ''}`)
      .then((response) => {
        setResourceList(response.data);
        let noOfPages = Math.ceil(response.data.count / 5);
        console.log("noOfPages", noOfPages);
        setQuery((q) => ({
          ...q,
          totalPages: noOfPages,
          pages: new Array(noOfPages).fill().map((_i, inx) => inx),
        }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function submitAddEditResources(formdata) {
    console.log("formdata isEdit", formdata, isEdit);
    if (isEdit) {
      await API.put(
        `program/api/program/opsresource/` + formdata.id + `/`,
        formdata
      )
        .then(() => {
          fetchPosts();
          HideAddResources();
          toast.success("Ops Resources Updated Successfully!");
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err);
        });
    } else {
      await API.post(`program/api/program/opsresource/`, formdata)
        .then((response) => {
          fetchPosts();
          HideAddResources();
          toast.success("Ops Resources Added Successfully!");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }
  const paginate = (number) => {
    console.log("number", number);
    setQuery((q) => ({
      ...q,
      currentPage: number,
    }));
  };
  const handleSubmit = (formdata) => {
    submitAddEditResources(formdata);
  };

  const onSearch = () => {
    if (search === "") {
      fetchPosts();
      return;
    }
    // const filterData = resourceList.filter((item) => {
    //   var re = new RegExp(search, "gi");
    //   if (item.title.match(re)) return item;
    // });
    // setResourceList(filterData);
    
    API.get(`program/api/program/opsresource/?page=${query?.currentPage === 1 ? query?.currentPage : query?.currentPage
      }&page_size=${query?.perPage}&search=` + search)
      .then((response) => {
        setResourceList(response.data);
        let noOfPages = Math.ceil(response.data.count / 5);
        console.log("noOfPages", noOfPages);
        setQuery((q) => ({
          ...q,
          totalPages: noOfPages,
          pages: new Array(noOfPages).fill().map((_i, inx) => inx),
        }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [query?.currentPage]);

  return (
    <div className="p-3 m-3 body-container">
      {showAddResources ? (
        <ResourceModal
          showModal={showAddResources}
          hideModal={() => HideAddResources()}
          isEdit={isEdit}
          editResData={editResData}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
      <div className="d-flex justify-content-between pb-2">
        <div className="row">
          <div className="col-md-8">
            <Form.Group as={Col} controlId="manager">
              <Form.Control
                placeholder="Search by title"
                name="keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-md-2">
            <div className="d-flex justify-content-between align-items-end h-100">
              <button onClick={() => onSearch()}>Go</button>
            </div>

          </div>
        </div>
        
        <Button
          variant="primary"
          type="button"
          className="mx-2 btn btn-primary-background"
          onClick={() => setShowAddResources(true)}
        >
          + Add Ops Resources
        </Button>
        {/* <Link to="/addProgram" className='btn btn-primary-background'>+ Add Ops Resources</Link> */}
      </div>
      {resourceList?.results?.map((item) => {
        return (
          <>
            <div className="resource-content">
              <Card className="mt-1">
                <Card.Body>
                  <Card.Title className="res-title d-flex justify-content-between">
                    {item.title}
                    <div className="resource-actions">
                      <MdEdit
                        className="cursor-pointer"
                        onClick={() => editResources(item)}
                      />{" "}
                      <div className="vhr"></div>{" "}
                      <MdDelete
                        className="cursor-pointer"
                        // onClick={() => deleteResources(item.id)}
                        onClick={() => showDeleteModal(item.id)}
                      />
                    </div>
                  </Card.Title>
                  <Card.Link href={item.link} className="pb-2" target="_blank">
                    {item.link}
                  </Card.Link>
                  <Card.Text className="res-desc mt-2">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <hr />
          </>
        );
      })}
      <div className="row">
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ marginTop: "2px" }}>
            {query.totalPages > 0 && (
              <PaginationTabs
                shareQuery={query}
                pageShare={paginate}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
      <DeleteModal showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} id={id} />
    </div>
  );
}
