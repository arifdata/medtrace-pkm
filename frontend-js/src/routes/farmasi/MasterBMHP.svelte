<script>
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import SumberBMHP from "./master_bmhp_components/SumberBMHP.svelte";
  import TabelMasterBMHP from "./master_bmhp_components/TabelMasterBMHP.svelte";
</script>

<Tabs type="container" selected={0}>
  <Tab tabindex="0" label="Master BMHP" />
  <Tab tabindex="1" label="Sumber BMHP" />

  <svelte:fragment slot="content">
    <TabContent>
      <TabelMasterBMHP />
    </TabContent>
    <TabContent>
      <SumberBMHP />
    </TabContent>
  </svelte:fragment>
</Tabs>
