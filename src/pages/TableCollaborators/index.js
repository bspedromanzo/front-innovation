import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import api from "../../service/api";
import Button from '@mui/material/Button';
import './tableCollaborators.css'
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { AiOutlineUser, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail',
  },
  {
    id: 'acoes',
    numeric: false,
    disablePadding: false,
    label: 'Ações',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className="colunmLabel"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [rows, setRows] = React.useState([])
  const [collaborators, setCollaborators] = React.useState([]);
  const [painelModal, setPainelModal] = React.useState(false);
  const [idModal, setIdModal] = React.useState();
  const [editModal, setEditModal] = React.useState(false);
  const [modalCancel, setModalCancel] = React.useState(false);

  React.useEffect(() => {
    api
      .get("/TodosColaboradores")
      .then((response) => {
        setCollaborators(response.data);
        setRows(response.data.map(key => ({
          id: key['id'], tipo: key['type'], collaborator: key['name'], email: key['email']
        })))
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleModalClose = () => {
    setPainelModal(false)
    setEditModal(false)
    setModalCancel(false)
  };

  const submitModalEdit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const dados = {
      id: idModal,
      name: data.nameCollaboratorEdit,
      email: data.emailCollaboratorEdit,
      type: data.typeCollaboratorEdit
    }

    api.put("/AtualizarColaborador", dados);

    setOpen(true)
    setTimeout(function () {
      window.location.reload(1);
    }, 3000);
  }

  const handleCancelOrdered = async (e) => {

    api.post('/DeletarColaborador', {id: idModal})

    setOpen(true)
    setTimeout(function () {
      window.location.reload(1);
    }, 3000);
  }

  function ModalPainel(props) {
    return (
      <Modal
        show={painelModal}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleModalClose}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Perfil
          </Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </Modal.Header>
        <Modal.Body className="cancelBody">
          <div className='titleProfile'>
            <h4>Informações do colaborador</h4>
          </div>
          {collaborators.map(key => {
            if (key['id'] == idModal) {
              return (
                <Table striped bordered hover className="tableProfile">
                  <tbody>
                    <tr>
                      <td className="labelConfirm">Nome do cliente</td>
                      <td>{key['name']}</td>
                    </tr>
                    
                    <tr>
                      <td className="labelConfirm">Tipo de colaborador</td>
                      <td>{key['type']}</td>
                    </tr>

                    <tr>
                      <td className="labelConfirm">E-mail</td>
                      <td>{key['email']}</td>
                    </tr>

                  </tbody>
                </Table>
              )
            }
          })}
        </Modal.Body>
      </Modal>
    )

  }

  function ModalEdit(props) {
    return (
      <Modal
        show={editModal}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleModalClose}
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Editar perfil
          </Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </Modal.Header>
        <Modal.Body className="cancelBody">
          <div className='titleProfile'>
            <h4>Informações do colaborador</h4>
          </div>
          {collaborators.map(key => {
            if (key['id'] == idModal) {
              return (
                <form className="input" onSubmit={submitModalEdit}>
                  <Table striped bordered hover className="tableProfile">
                    <tbody>
                      <tr>
                        <td className="labelConfirm">Nome do colaborador:</td>
                        <td>
                          <input
                            required
                            name="nameCollaboratorEdit"
                            className="inputCadastro"
                            defaultValue={key['name']}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="labelConfirm">Tipo de colaborador:</td>
                        <td>
                          <Form.Select
                            name='typeCollaboratorEdit'
                            className="inputCadastro"
                          >
                            <option value='' >Selecione um colaborador</option>
                            <option value='superadmin' selected={key['type'] == 'superadmin'}>Superadmin</option>
                            <option value='collaborator' selected={key['type'] == 'collaborator'}>Colaborador</option>
                          </Form.Select>
                        </td>
                      </tr>
                      <tr>
                        <td className="labelConfirm">E-mail</td>
                        <td>
                          <input
                            required
                            name="emailCollaboratorEdit"
                            className="inputCadastro"
                            defaultValue={key['email']}
                          />
                        </td>
                      </tr>

                    </tbody>
                  </Table>
                  <div className="buttonLogin">
                    <button className="buttonSecundary" >
                      Atualizar
                    </button>
                  </div>
                </form>
              )
            }
          })}
        </Modal.Body>
      </Modal>
    )
  }

  function ModalCancelar(props) {
    return (
      <Modal
        show={modalCancel}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleModalClose}
      >
        <Modal.Header closeButton={handleModalClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            Excluir colaborador
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="cancelBody">
          <h4>Você tem certeza que deseja excluir o colaborador selecionado?</h4>
          <div className="cancelOrder">
            <Button onClick={handleCancelOrdered} className="cancelButton true">Sim</Button>
            <Button onClick={handleModalClose} className="cancelButton false">Não</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  const [open, setOpen] = React.useState(false);

  function Loading() {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <>
      <Loading />
      <ModalCancelar />
      <ModalPainel />
      <ModalEdit />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row['id']);
                    const labelId = `enhanced-table-checkbox-${row['id']}`;
                    let dateDelivery = 'Ainda não foi entregue';
                    if (row.horarioDaEntrega !== null) {
                      dateDelivery = row.horarioDaEntrega
                    }
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row['id']}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                          className="nameTable"
                        >
                          {row.collaborator}
                        </TableCell>

                        <TableCell align="left">
                          {
                            row.tipo
                          }
                        </TableCell>

                        <TableCell align="left">
                          {
                            row.email
                          }
                        </TableCell>

                        <TableCell align="left" >
                          <div className="buttonContainer">
                            <Tooltip title="Perfil" className='buttonActionTable' onClick={() => {
                              setPainelModal(true)
                              setIdModal(row.id)
                            }}>
                              <AiOutlineUser className='perfilAction' />
                            </Tooltip>
                            <Tooltip title="Editar" className='buttonActionTable' onClick={() => {
                              setEditModal(true)
                              setIdModal(row.id)
                            }}>
                              <AiOutlineEdit className='perfilAction' />
                            </Tooltip>
                            <Tooltip title="Deletar" className='buttonActionTable' onClick={() => {
                              setModalCancel(true)
                              setIdModal(row.id)
                            }}>
                              <AiOutlineDelete className='perfilAction' />
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
