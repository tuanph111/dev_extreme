import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import axios from "axios";

const jsonUrl = "https://jsonplaceholder.typicode.com/posts";

const data = new CustomStore({
  key: "id",
  load: (loadOptions) => {
    console.log("load option", loadOptions);
    return axios
      .get(`${jsonUrl}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer ZboA58rdY-6cfWRDLixg_OzPZuY",
        },
        params: {
          offset: loadOptions.skip,
          limit: loadOptions.take,
        },
      })
      .then((response) => {
        console.log("response", response);
        return {
          data: response.data,
          totalCount: response.data.length,
        };
      });
  },
});

function Posts() {
  return (
    <DataGrid
      dataSource={data}
      defaultPaging={0}
      remoteOperations={true}
      showBorders={true}
      showRowLines={true}
    >
      <Column dataField="userId" />
      <Column dataField="id" />
      <Column dataField="title" />
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
