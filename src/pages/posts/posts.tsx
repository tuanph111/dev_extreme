import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import axios from "axios";
import { useEffect, useState } from "react";

const jsonUrl = "https://jsonplaceholder.typicode.com/posts";

const testURL = "http://localhost:8080/rest/entities/PartNumber";

const data = new CustomStore({
  key: "id",
  load: (loadOptions: any) => {
    console.log("load option", loadOptions);
    return fetch(`${testURL}?offset=0&limit=5`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwZE1UZFEwM0d5d3ZxWVV1bFBydlBEdTk2N3pJN1BmZ3M2cmYwUFVXS2lzIn0.eyJleHAiOjE2Njc1ODg3ODIsImlhdCI6MTY2NzU1MjgzMSwiYXV0aF90aW1lIjoxNjY3NTUyNzgyLCJqdGkiOiJjNjkzYTc0NS0yMmQ2LTQyMTAtYjllZi1iZWUwZmY3MjVmZjYiLCJpc3MiOiJodHRwczovL3Nzby5mYWNlbmV0LnZuL2F1dGgvcmVhbG1zL0ZhY2VuZXQiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiMWQ2M2Y1ZWQtZGE3OC00YjI0LWE5OGEtMThhZDJkZDA2Mjk3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGxhbm5pbmdfcmVhY3QiLCJub25jZSI6ImFlNDM4NTYxLWE4Y2MtNGFhZi04OWY3LTZkY2JlZjE2YTgzMyIsInNlc3Npb25fc3RhdGUiOiJjZjU1ODg1Yi02NjBlLTQ3OWQtYjE3OS03ZjQ1MzVkZmUwMjciLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsic2NyZWVuLlByb2R1Y3RPcmRlciIsInNjcmVlbi5Xb3JrT3JkZXJNYW5hZ2VyIiwiUmFuZ0RvbmdfUGxhbm5pbmciLCJyZXNvdXJjZSRzeXN0ZW0tZnVsbC1hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWZhY2VuZXQiLCJvZmZsaW5lX2FjY2VzcyIsInNjcmVlbi5FbXBsb3llZU1hbmFnZXIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjcmVlbi5Nb25pdG9yIiwicGxhbm5pbmdfZW1wbG95ZWUiLCJzY3JlZW4uUHJvZ3JhbWluZyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCIsInNpZCI6ImNmNTU4ODViLTY2MGUtNDc5ZC1iMTc5LTdmNDUzNWRmZTAyNyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsic2NyZWVuLlByb2R1Y3RPcmRlciIsInNjcmVlbi5Xb3JrT3JkZXJNYW5hZ2VyIiwiUmFuZ0RvbmdfUGxhbm5pbmciLCJyZXNvdXJjZSRzeXN0ZW0tZnVsbC1hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWZhY2VuZXQiLCJvZmZsaW5lX2FjY2VzcyIsInNjcmVlbi5FbXBsb3llZU1hbmFnZXIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjcmVlbi5Nb25pdG9yIiwicGxhbm5pbmdfZW1wbG95ZWUiLCJzY3JlZW4uUHJvZ3JhbWluZyJdLCJncm91cHMiOlsiUmFuZ0RvbmciXSwiZW1haWwiOiJhbmh2YW5tbzExNEBnbWFpbC5jb20ifQ.M1qr6NBtKoxI0HW_R-6AK7FjJsyQgUNvj90U5_hB2NLqCCg86d4ZG3gBeh-_6x5Ys3FuB8csalIibs7-iftcF8qLSDVX7HI4XjNfZup2onntkNAeA89YhLk5UAlOELa-Z5koPd-IWz-sIaVQJVoUytzxb-tR2b_xqBv05UgU3IUUzMVgVe7ZReHzyhAB2SgZnarfbWAsvcb4me9wO44f33Mb9hyCgG14WwKtsCRWnYJHX4vDObt-S5H4CxTDFaDAVSUkInZUwxR1vxHp9qplaMgfESTdk7fkxyJ1FZ1ZxSpzABWYVEiFiowK_6ghYmFo-YeLI9Ucz00wVBbjXQD0FA",
      },
      body: null,
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        const values = {
          data: response.data,
          totalCount: response.data.length,
        };
        console.log("values", values);
        return values;
      });
  },
});

function Posts() {
  const [dataSource, setDataSouce] = useState([]);
  useEffect(() => {
    axios.get(`${jsonUrl}`).then((response) => {
      setDataSouce(response.data);
    });
  }, []);
  return (
    <DataGrid
      dataSource={data}
      remoteOperations={true}
      showBorders={true}
      showRowLines={true}
    >
      <Column dataField="_instanceName" />
      <Column dataField="id" />
      <Column dataField="description" />
      <Column dataField="name" />
      <Paging defaultPageSize={5} />
      <Pager
        showPageSizeSelector={true}
        showInfo={true}
        allowedPageSizes={[5, 10, 15]}
      />
    </DataGrid>
  );
}

export default Posts;
