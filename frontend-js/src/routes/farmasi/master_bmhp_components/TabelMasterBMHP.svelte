<script>
    import { client } from "../../../pb/client";

    import {
        DataTableSkeleton,
        InlineNotification,
        Pagination,
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Button,
        Link,
    } from "carbon-components-svelte";

    async function listFullMasterBMHP() {
        const resultList = await client.collection("master_bmhp").getFullList({
            sort: "nama_obat",
            expand: "sumber",
        });
        return resultList;
    }

    let promiseListMaster = listFullMasterBMHP();
    console.log(promiseListMaster);
</script>

load tabel disini
