<script>
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import SumberBMHP from "./master_bmhp_components/SumberBMHP.svelte";
</script>

<Tabs>
  <Tab label="Master BMHP" />
  <Tab label="Sumber BMHP" />

  <svelte:fragment slot="content">
    <TabContent>Content 1</TabContent>
    <TabContent>
      <SumberBMHP />
    </TabContent>
  </svelte:fragment>
</Tabs>
