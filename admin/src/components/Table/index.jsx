import React from "react";

function BasicTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Id</TableCell> */}
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Buying Price</TableCell>
            <TableCell align="right">Selling Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {stocks.map(
            (row, i) =>
              i < 6 && (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  {/* <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell> */}
                  <TableCell component="th" scope="row">
                    {row?.brand?.name?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.model?.name?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  </TableCell>
                  <TableCell align="right">
                    {row?.category?.name?.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                  </TableCell>
                  <TableCell align="right">{row?.buyPrice}</TableCell>
                  <TableCell align="right">{row?.sellPrice}</TableCell>
                  <TableCell align="right">{row?.qty}</TableCell>
                  <TableCell align="right">{"In Stock"}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
