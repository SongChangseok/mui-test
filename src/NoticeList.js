import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Fetch } from "./common/Fetch";

const TestTable = ({ data }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>제목</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TestTableBody data={data} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const TestTableBody = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [notiNo, setNotiNo] = useState("");

  const handleClickOpen = (noti_no) => {
    setOpen(true);
    setNotiNo(noti_no);
  };
  const handleClose = () => {
    setOpen(false);
    setNotiNo("");
  };

  return (
    <>
      {data.data.map(({ seq, noti_subj, noti_no }) => (
        <TableRow
          key={noti_no}
          hover
          onClick={() => {
            handleClickOpen(noti_no);
          }}
        >
          <TableCell>{seq}</TableCell>
          <TableCell>{noti_subj}</TableCell>
        </TableRow>
      ))}

      <NoticeDetail open={open} noti_no={notiNo} handleClose={handleClose} />
    </>
  );
};

const NoticeDetail = ({ open, noti_no, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      {
        // open이 false일 경우 다시 render할 필요가 없으므로 이렇게 처리
        open && (
          <>
            <DialogTitle>공지사항</DialogTitle>
            <DialogContent>
              <Fetch
                uri={`/dstk/Notice/getNoticeDetail.do`}
                req={{ body: { noti_no: noti_no } }}
                renderSuccess={TestDialog}
              />
              <Fetch
                uri={`/dstk/Notice/getFileList.do`}
                req={{ body: { noti_no: noti_no } }}
                renderSuccess={(data) => TestDialog2(data, noti_no)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>확인</Button>
            </DialogActions>
          </>
        )
      }
    </Dialog>
  );
};

const TestDialog = ({ data }) => {
  const { regi_dt, noti_contn } = data.data;

  return (
    <Box sx={{ backgroundColor: "#dce8f4" }}>
      <DialogContentText>{noti_contn}</DialogContentText>
      <DialogContentText sx={{ fontSize: 12 }}>{regi_dt}</DialogContentText>
    </Box>
  );
};

const TestDialog2 = ({ data }, noti_no) => {
  if (!data.success) return;

  const download = (noti_no, { attach_seq, file_seq, file_name }) => {
    const queryStr = new URLSearchParams({
      attach_no: noti_no,
      attach_seq: attach_seq,
      file_seq: file_seq,
      file_name: file_name,
    }).toString();

    const href = `/dstk/Notice/downloadFile.do?${queryStr}`;
    const link = document.createElement("a");
    link.href = href;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ backgroundColor: "#f3f3f3" }}>
      <List>
        {data.data.map((v) => {
          return (
            <ListItem
              key={v.attach_seq}
              button
              onClick={() => download(noti_no, v)}
            >
              <ListItemText>{v.file_name}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default function NoticeList() {
  return (
    <Fetch uri={`/dstk/Notice/getNoticeList.do`} renderSuccess={TestTable} />
  );
}
